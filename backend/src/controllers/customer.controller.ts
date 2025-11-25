import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { CustomerService } from '../services/customer.service';

const customerService = new CustomerService();

export class CustomerController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const customers = await customerService.getAll();
      res.json(customers);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await customerService.getById(id);
      res.json(customer);
    } catch (error: any) {
      if (error.message === 'Customer not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const customer = await customerService.create(req.body);
      res.status(201).json(customer);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await customerService.update(id, req.body);
      res.json(customer);
    } catch (error: any) {
      if (error.message === 'Customer not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const customer = await customerService.delete(id);
      res.json(customer);
    } catch (error: any) {
      if (error.message === 'Customer not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getProjects(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const projects = await customerService.getProjects(id);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }
}
