import { query } from '../config/database';

export class EmployeeService {
  async getAll() {
    const result = await query(
      `SELECT e.employee_id, e.employee_name, e.email, e.role, e.department,
              e.hire_date, e.hourly_rate, e.active, e.created_at, e.updated_at,
              ur.role as user_role
       FROM employees e
       LEFT JOIN user_roles ur ON e.user_id = ur.user_id AND ur.active = true
       ORDER BY e.employee_name ASC`
    );
    return result.rows;
  }

  async getById(employeeId: string) {
    const result = await query(
      `SELECT e.employee_id, e.user_id, e.employee_name, e.email, e.role,
              e.department, e.hire_date, e.hourly_rate, e.active,
              e.created_at, e.updated_at, ur.role as user_role
       FROM employees e
       LEFT JOIN user_roles ur ON e.user_id = ur.user_id AND ur.active = true
       WHERE e.employee_id = $1`,
      [employeeId]
    );

    if (result.rows.length === 0) {
      throw new Error('Employee not found');
    }

    return result.rows[0];
  }

  async create(data: any) {
    const { employeeName, email, role, department, hireDate, hourlyRate, userId } = data;

    const result = await query(
      `INSERT INTO employees (employee_name, email, role, department, hire_date, hourly_rate, user_id, active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
       RETURNING *`,
      [employeeName, email, role, department, hireDate, hourlyRate, userId || null]
    );

    return result.rows[0];
  }

  async update(employeeId: string, data: any) {
    const { employeeName, email, role, department, hireDate, hourlyRate, active } = data;

    const result = await query(
      `UPDATE employees
       SET employee_name = COALESCE($1, employee_name),
           email = COALESCE($2, email),
           role = COALESCE($3, role),
           department = COALESCE($4, department),
           hire_date = COALESCE($5, hire_date),
           hourly_rate = COALESCE($6, hourly_rate),
           active = COALESCE($7, active),
           updated_at = NOW()
       WHERE employee_id = $8
       RETURNING *`,
      [employeeName, email, role, department, hireDate, hourlyRate, active, employeeId]
    );

    if (result.rows.length === 0) {
      throw new Error('Employee not found');
    }

    return result.rows[0];
  }

  async updateStatus(employeeId: string, active: boolean) {
    const result = await query(
      `UPDATE employees SET active = $1, updated_at = NOW()
       WHERE employee_id = $2
       RETURNING *`,
      [active, employeeId]
    );

    if (result.rows.length === 0) {
      throw new Error('Employee not found');
    }

    return result.rows[0];
  }

  async getTimesheets(employeeId: string) {
    const result = await query(
      `SELECT t.timesheet_id, t.project_id, p.project_name, t.work_date,
              t.hours_worked, t.description, t.billable, t.created_at
       FROM timesheets t
       JOIN projects p ON t.project_id = p.project_id
       WHERE t.employee_id = $1
       ORDER BY t.work_date DESC`,
      [employeeId]
    );

    return result.rows;
  }

  async getProjects(employeeId: string) {
    const result = await query(
      `SELECT p.project_id, p.project_name, p.status, ptm.assigned_date,
              ptm.role as project_role
       FROM project_team_members ptm
       JOIN projects p ON ptm.project_id = p.project_id
       WHERE ptm.employee_id = $1
       ORDER BY ptm.assigned_date DESC`,
      [employeeId]
    );

    return result.rows;
  }
}
