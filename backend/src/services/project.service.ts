import { query } from '../config/database';

export class ProjectService {
  async getAll(filters?: any) {
    let sql = `
      SELECT p.project_id, p.project_name, p.customer_id, c.customer_name,
             p.start_date, p.end_date, p.status, p.budget, p.project_type,
             p.active, p.created_at, p.updated_at
      FROM projects p
      JOIN customers c ON p.customer_id = c.customer_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.status) {
      params.push(filters.status);
      sql += ` AND p.status = $${params.length}`;
    }

    if (filters?.customerId) {
      params.push(filters.customerId);
      sql += ` AND p.customer_id = $${params.length}`;
    }

    sql += ' ORDER BY p.start_date DESC';

    const result = await query(sql, params);
    return result.rows;
  }

  async getById(projectId: string) {
    const result = await query(
      `SELECT p.project_id, p.project_name, p.customer_id, c.customer_name,
              p.start_date, p.end_date, p.status, p.budget, p.project_type,
              p.active, p.created_at, p.updated_at
       FROM projects p
       JOIN customers c ON p.customer_id = c.customer_id
       WHERE p.project_id = $1`,
      [projectId]
    );

    if (result.rows.length === 0) {
      throw new Error('Project not found');
    }

    return result.rows[0];
  }

  async create(data: any) {
    const { projectName, customerId, startDate, endDate, status, budget, projectType } = data;

    const result = await query(
      `INSERT INTO projects (project_name, customer_id, start_date, end_date, status, budget, project_type, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
       RETURNING *`,
      [projectName, customerId, startDate, endDate, status || 'Planning', budget, projectType]
    );

    return result.rows[0];
  }

  async update(projectId: string, data: any) {
    const { projectName, startDate, endDate, status, budget, projectType, active } = data;

    const result = await query(
      `UPDATE projects
       SET project_name = COALESCE($1, project_name),
           start_date = COALESCE($2, start_date),
           end_date = COALESCE($3, end_date),
           status = COALESCE($4, status),
           budget = COALESCE($5, budget),
           project_type = COALESCE($6, project_type),
           active = COALESCE($7, active),
           updated_at = NOW()
       WHERE project_id = $8
       RETURNING *`,
      [projectName, startDate, endDate, status, budget, projectType, active, projectId]
    );

    if (result.rows.length === 0) {
      throw new Error('Project not found');
    }

    return result.rows[0];
  }

  async updateStatus(projectId: string, status: string) {
    const result = await query(
      `UPDATE projects SET status = $1, updated_at = NOW()
       WHERE project_id = $2
       RETURNING *`,
      [status, projectId]
    );

    if (result.rows.length === 0) {
      throw new Error('Project not found');
    }

    return result.rows[0];
  }

  async getTeam(projectId: string) {
    const result = await query(
      `SELECT ptm.team_member_id, ptm.employee_id, e.employee_name,
              ptm.role, ptm.assigned_date, ptm.allocation_percentage
       FROM project_team_members ptm
       JOIN employees e ON ptm.employee_id = e.employee_id
       WHERE ptm.project_id = $1
       ORDER BY ptm.assigned_date DESC`,
      [projectId]
    );

    return result.rows;
  }

  async addTeamMember(projectId: string, data: any) {
    const { employeeId, role, allocationPercentage } = data;

    const result = await query(
      `INSERT INTO project_team_members (project_id, employee_id, role, allocation_percentage)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [projectId, employeeId, role, allocationPercentage || 100]
    );

    return result.rows[0];
  }

  async removeTeamMember(projectId: string, employeeId: string) {
    const result = await query(
      `DELETE FROM project_team_members
       WHERE project_id = $1 AND employee_id = $2
       RETURNING *`,
      [projectId, employeeId]
    );

    if (result.rows.length === 0) {
      throw new Error('Team member not found');
    }

    return result.rows[0];
  }
}
