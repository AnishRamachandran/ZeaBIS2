import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { EmployeeService } from '../services/employee.service';

const employeeService = new EmployeeService();

export class EmployeeController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const employees = await employeeService.getAll();
      res.json(employees);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const employee = await employeeService.getById(id);
      res.json(employee);
    } catch (error: any) {
      if (error.message === 'Employee not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const employee = await employeeService.create(req.body);
      res.status(201).json(employee);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const employee = await employeeService.update(id, req.body);
      res.json(employee);
    } catch (error: any) {
      if (error.message === 'Employee not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { active } = req.body;
      const employee = await employeeService.updateStatus(id, active);
      res.json(employee);
    } catch (error: any) {
      if (error.message === 'Employee not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getTimesheets(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const timesheets = await employeeService.getTimesheets(id);
      res.json(timesheets);
    } catch (error) {
      next(error);
    }
  }

  async getProjects(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const projects = await employeeService.getProjects(id);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }
}
