import { query } from '../config/database';

export class CustomerService {
  async getAll() {
    const result = await query(
      `SELECT customer_id, customer_name, contact_person, contact_email,
              contact_phone, address, active, created_at, updated_at
       FROM customers
       ORDER BY customer_name ASC`
    );
    return result.rows;
  }

  async getById(customerId: string) {
    const result = await query(
      `SELECT customer_id, customer_name, contact_person, contact_email,
              contact_phone, address, active, created_at, updated_at
       FROM customers
       WHERE customer_id = $1`,
      [customerId]
    );

    if (result.rows.length === 0) {
      throw new Error('Customer not found');
    }

    return result.rows[0];
  }

  async create(data: any) {
    const { customerName, contactPerson, contactEmail, contactPhone, address } = data;

    const result = await query(
      `INSERT INTO customers (customer_name, contact_person, contact_email, contact_phone, address, active)
       VALUES ($1, $2, $3, $4, $5, true)
       RETURNING *`,
      [customerName, contactPerson, contactEmail, contactPhone, address]
    );

    return result.rows[0];
  }

  async update(customerId: string, data: any) {
    const { customerName, contactPerson, contactEmail, contactPhone, address, active } = data;

    const result = await query(
      `UPDATE customers
       SET customer_name = COALESCE($1, customer_name),
           contact_person = COALESCE($2, contact_person),
           contact_email = COALESCE($3, contact_email),
           contact_phone = COALESCE($4, contact_phone),
           address = COALESCE($5, address),
           active = COALESCE($6, active),
           updated_at = NOW()
       WHERE customer_id = $7
       RETURNING *`,
      [customerName, contactPerson, contactEmail, contactPhone, address, active, customerId]
    );

    if (result.rows.length === 0) {
      throw new Error('Customer not found');
    }

    return result.rows[0];
  }

  async delete(customerId: string) {
    const result = await query(
      `UPDATE customers SET active = false, updated_at = NOW()
       WHERE customer_id = $1
       RETURNING *`,
      [customerId]
    );

    if (result.rows.length === 0) {
      throw new Error('Customer not found');
    }

    return result.rows[0];
  }

  async getProjects(customerId: string) {
    const result = await query(
      `SELECT project_id, project_name, start_date, end_date, status, budget
       FROM projects
       WHERE customer_id = $1
       ORDER BY start_date DESC`,
      [customerId]
    );

    return result.rows;
  }
}
