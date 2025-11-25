import { query } from '../config/database';

export class ProposalService {
  async getAll() {
    const result = await query(
      `SELECT pr.proposal_id, pr.project_id, p.project_name, pr.proposal_number,
              pr.proposal_date, pr.amount, pr.status, pr.notes, pr.created_at
       FROM proposals pr
       JOIN projects p ON pr.project_id = p.project_id
       ORDER BY pr.proposal_date DESC`
    );
    return result.rows;
  }

  async getById(proposalId: string) {
    const result = await query(
      `SELECT pr.*, p.project_name, c.customer_name
       FROM proposals pr
       JOIN projects p ON pr.project_id = p.project_id
       JOIN customers c ON p.customer_id = c.customer_id
       WHERE pr.proposal_id = $1`,
      [proposalId]
    );

    if (result.rows.length === 0) {
      throw new Error('Proposal not found');
    }

    return result.rows[0];
  }

  async create(data: any) {
    const { projectId, proposalNumber, proposalDate, amount, status, notes } = data;

    const result = await query(
      `INSERT INTO proposals (project_id, proposal_number, proposal_date, amount, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [projectId, proposalNumber, proposalDate, amount, status || 'Draft', notes]
    );

    return result.rows[0];
  }

  async update(proposalId: string, data: any) {
    const { proposalNumber, proposalDate, amount, status, notes } = data;

    const result = await query(
      `UPDATE proposals
       SET proposal_number = COALESCE($1, proposal_number),
           proposal_date = COALESCE($2, proposal_date),
           amount = COALESCE($3, amount),
           status = COALESCE($4, status),
           notes = COALESCE($5, notes),
           updated_at = NOW()
       WHERE proposal_id = $6
       RETURNING *`,
      [proposalNumber, proposalDate, amount, status, notes, proposalId]
    );

    if (result.rows.length === 0) {
      throw new Error('Proposal not found');
    }

    return result.rows[0];
  }
}

export class PurchaseOrderService {
  async getAll() {
    const result = await query(
      `SELECT po.po_id, po.project_id, p.project_name, po.po_number,
              po.po_date, po.amount, po.status, po.start_date, po.end_date,
              po.created_at
       FROM purchase_orders po
       JOIN projects p ON po.project_id = p.project_id
       ORDER BY po.po_date DESC`
    );
    return result.rows;
  }

  async getById(poId: string) {
    const result = await query(
      `SELECT po.*, p.project_name, c.customer_name
       FROM purchase_orders po
       JOIN projects p ON po.project_id = p.project_id
       JOIN customers c ON p.customer_id = c.customer_id
       WHERE po.po_id = $1`,
      [poId]
    );

    if (result.rows.length === 0) {
      throw new Error('Purchase order not found');
    }

    return result.rows[0];
  }

  async create(data: any) {
    const { projectId, poNumber, poDate, amount, status, startDate, endDate } = data;

    const result = await query(
      `INSERT INTO purchase_orders (project_id, po_number, po_date, amount, status, start_date, end_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [projectId, poNumber, poDate, amount, status || 'Draft', startDate, endDate]
    );

    return result.rows[0];
  }

  async update(poId: string, data: any) {
    const { poNumber, poDate, amount, status, startDate, endDate } = data;

    const result = await query(
      `UPDATE purchase_orders
       SET po_number = COALESCE($1, po_number),
           po_date = COALESCE($2, po_date),
           amount = COALESCE($3, amount),
           status = COALESCE($4, status),
           start_date = COALESCE($5, start_date),
           end_date = COALESCE($6, end_date),
           updated_at = NOW()
       WHERE po_id = $7
       RETURNING *`,
      [poNumber, poDate, amount, status, startDate, endDate, poId]
    );

    if (result.rows.length === 0) {
      throw new Error('Purchase order not found');
    }

    return result.rows[0];
  }

  async getUtilization(poId: string) {
    const result = await query(
      `SELECT
         po.amount as total_amount,
         COALESCE(SUM(t.hours_worked * e.hourly_rate), 0) as utilized_amount,
         po.amount - COALESCE(SUM(t.hours_worked * e.hourly_rate), 0) as remaining_amount
       FROM purchase_orders po
       LEFT JOIN projects p ON po.project_id = p.project_id
       LEFT JOIN timesheets t ON p.project_id = t.project_id
       LEFT JOIN employees e ON t.employee_id = e.employee_id
       WHERE po.po_id = $1
       GROUP BY po.po_id, po.amount`,
      [poId]
    );

    if (result.rows.length === 0) {
      throw new Error('Purchase order not found');
    }

    return result.rows[0];
  }
}

export class DashboardService {
  async getStats() {
    const stats = await Promise.all([
      query('SELECT COUNT(*) as total FROM projects WHERE active = true'),
      query('SELECT COUNT(*) as total FROM customers WHERE active = true'),
      query('SELECT COUNT(*) as total FROM employees WHERE active = true'),
      query(`SELECT COALESCE(SUM(total_amount), 0) as total FROM invoices
             WHERE status = 'Paid' AND EXTRACT(YEAR FROM payment_date) = EXTRACT(YEAR FROM NOW())`),
    ]);

    return {
      totalProjects: parseInt(stats[0].rows[0].total),
      totalCustomers: parseInt(stats[1].rows[0].total),
      totalEmployees: parseInt(stats[2].rows[0].total),
      yearlyRevenue: parseFloat(stats[3].rows[0].total),
    };
  }

  async getRevenueAnalytics() {
    const result = await query(`
      SELECT
        TO_CHAR(payment_date, 'YYYY-MM') as month,
        SUM(total_amount) as revenue
      FROM invoices
      WHERE status = 'Paid' AND payment_date >= NOW() - INTERVAL '12 months'
      GROUP BY TO_CHAR(payment_date, 'YYYY-MM')
      ORDER BY month DESC
    `);

    return result.rows;
  }
}
