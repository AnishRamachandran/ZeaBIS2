import { query } from '../config/database';

export class InvoiceService {
  async getAll(filters?: any) {
    let sql = `
      SELECT i.invoice_id, i.po_id, po.po_number, i.invoice_number,
             i.invoice_date, i.due_date, i.total_amount, i.tax_amount,
             i.status, i.payment_date, i.created_at
      FROM invoices i
      LEFT JOIN purchase_orders po ON i.po_id = po.po_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.status) {
      params.push(filters.status);
      sql += ` AND i.status = $${params.length}`;
    }

    if (filters?.poId) {
      params.push(filters.poId);
      sql += ` AND i.po_id = $${params.length}`;
    }

    sql += ' ORDER BY i.invoice_date DESC';

    const result = await query(sql, params);
    return result.rows;
  }

  async getById(invoiceId: string) {
    const result = await query(
      `SELECT i.*, po.po_number, po.project_id, p.project_name
       FROM invoices i
       LEFT JOIN purchase_orders po ON i.po_id = po.po_id
       LEFT JOIN projects p ON po.project_id = p.project_id
       WHERE i.invoice_id = $1`,
      [invoiceId]
    );

    if (result.rows.length === 0) {
      throw new Error('Invoice not found');
    }

    return result.rows[0];
  }

  async create(data: any) {
    const { poId, invoiceNumber, invoiceDate, dueDate, totalAmount, taxAmount, status } = data;

    const result = await query(
      `INSERT INTO invoices (po_id, invoice_number, invoice_date, due_date, total_amount, tax_amount, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [poId, invoiceNumber, invoiceDate, dueDate, totalAmount, taxAmount, status || 'Draft']
    );

    return result.rows[0];
  }

  async update(invoiceId: string, data: any) {
    const { invoiceNumber, invoiceDate, dueDate, totalAmount, taxAmount, status, paymentDate } = data;

    const result = await query(
      `UPDATE invoices
       SET invoice_number = COALESCE($1, invoice_number),
           invoice_date = COALESCE($2, invoice_date),
           due_date = COALESCE($3, due_date),
           total_amount = COALESCE($4, total_amount),
           tax_amount = COALESCE($5, tax_amount),
           status = COALESCE($6, status),
           payment_date = COALESCE($7, payment_date),
           updated_at = NOW()
       WHERE invoice_id = $8
       RETURNING *`,
      [invoiceNumber, invoiceDate, dueDate, totalAmount, taxAmount, status, paymentDate, invoiceId]
    );

    if (result.rows.length === 0) {
      throw new Error('Invoice not found');
    }

    return result.rows[0];
  }

  async updateStatus(invoiceId: string, status: string) {
    const result = await query(
      `UPDATE invoices SET status = $1, updated_at = NOW()
       WHERE invoice_id = $2
       RETURNING *`,
      [status, invoiceId]
    );

    if (result.rows.length === 0) {
      throw new Error('Invoice not found');
    }

    return result.rows[0];
  }

  async getDetails(invoiceId: string) {
    const result = await query(
      `SELECT * FROM invoice_details WHERE invoice_id = $1 ORDER BY line_item_number`,
      [invoiceId]
    );

    return result.rows;
  }

  async addDetail(invoiceId: string, data: any) {
    const { description, quantity, unitPrice, lineTotal } = data;

    const result = await query(
      `INSERT INTO invoice_details (invoice_id, description, quantity, unit_price, line_total)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [invoiceId, description, quantity, unitPrice, lineTotal]
    );

    return result.rows[0];
  }
}
