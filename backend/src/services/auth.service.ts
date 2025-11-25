import { query } from '../config/database';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  async register(data: RegisterData) {
    const { email, password, firstName, lastName } = data;

    const existingUser = await query(
      'SELECT user_id FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const result = await query(
      `INSERT INTO users (email, password_hash, first_name, last_name, active)
       VALUES ($1, $2, $3, $4, true)
       RETURNING user_id, email, first_name, last_name, created_at`,
      [email, hashedPassword, firstName, lastName]
    );

    const user = result.rows[0];
    const token = generateToken({
      userId: user.user_id,
      email: user.email,
    });

    return {
      token,
      user: {
        userId: user.user_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
      },
    };
  }

  async login(data: LoginData) {
    const { email, password } = data;

    const result = await query(
      `SELECT u.user_id, u.email, u.password_hash, u.first_name, u.last_name,
              u.active, ur.role
       FROM users u
       LEFT JOIN user_roles ur ON u.user_id = ur.user_id AND ur.active = true
       WHERE u.email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      throw new Error('Invalid email or password');
    }

    const user = result.rows[0];

    if (!user.active) {
      throw new Error('Account is inactive');
    }

    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    const token = generateToken({
      userId: user.user_id,
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user: {
        userId: user.user_id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role,
      },
    };
  }

  async getCurrentUser(userId: string) {
    const result = await query(
      `SELECT u.user_id, u.email, u.first_name, u.last_name,
              u.active, ur.role, e.employee_id
       FROM users u
       LEFT JOIN user_roles ur ON u.user_id = ur.user_id AND ur.active = true
       LEFT JOIN employees e ON u.user_id = e.user_id AND e.active = true
       WHERE u.user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const user = result.rows[0];

    return {
      userId: user.user_id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.role,
      employeeId: user.employee_id,
      active: user.active,
    };
  }
}
