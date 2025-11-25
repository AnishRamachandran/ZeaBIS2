import { query } from '../config/database';

export class TimesheetService {
  async getAll(filters?: any) {
    let sql = `
      SELECT t.timesheet_id, t.employee_id, e.employee_name, t.project_id,
             p.project_name, t.work_date, t.hours_worked, t.description,
             t.billable, t.created_at, t.updated_at
      FROM timesheets t
      JOIN employees e ON t.employee_id = e.employee_id
      JOIN projects p ON t.project_id = p.project_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.employeeId) {
      params.push(filters.employeeId);
      sql += ` AND t.employee_id = $${params.length}`;
    }

    if (filters?.projectId) {
      params.push(filters.projectId);
      sql += ` AND t.project_id = $${params.length}`;
    }

    sql += ' ORDER BY t.work_date DESC';

    const result = await query(sql, params);
    return result.rows;
  }

  async getById(timesheetId: string) {
    const result = await query(
      `SELECT * FROM timesheets WHERE timesheet_id = $1`,
      [timesheetId]
    );

    if (result.rows.length === 0) {
      throw new Error('Timesheet not found');
    }

    return result.rows[0];
  }

  async create(data: any) {
    const { employeeId, projectId, workDate, hoursWorked, description, billable } = data;

    const result = await query(
      `INSERT INTO timesheets (employee_id, project_id, work_date, hours_worked, description, billable)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [employeeId, projectId, workDate, hoursWorked, description, billable !== false]
    );

    return result.rows[0];
  }

  async update(timesheetId: string, data: any) {
    const { workDate, hoursWorked, description, billable } = data;

    const result = await query(
      `UPDATE timesheets
       SET work_date = COALESCE($1, work_date),
           hours_worked = COALESCE($2, hours_worked),
           description = COALESCE($3, description),
           billable = COALESCE($4, billable),
           updated_at = NOW()
       WHERE timesheet_id = $5
       RETURNING *`,
      [workDate, hoursWorked, description, billable, timesheetId]
    );

    if (result.rows.length === 0) {
      throw new Error('Timesheet not found');
    }

    return result.rows[0];
  }

  async delete(timesheetId: string) {
    const result = await query(
      `DELETE FROM timesheets WHERE timesheet_id = $1 RETURNING *`,
      [timesheetId]
    );

    if (result.rows.length === 0) {
      throw new Error('Timesheet not found');
    }

    return result.rows[0];
  }
}
