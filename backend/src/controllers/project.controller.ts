import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ProjectService } from '../services/project.service';

const projectService = new ProjectService();

export class ProjectController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const filters = {
        status: req.query.status as string,
        customerId: req.query.customerId as string,
      };
      const projects = await projectService.getAll(filters);
      res.json(projects);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectService.getById(id);
      res.json(project);
    } catch (error: any) {
      if (error.message === 'Project not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const project = await projectService.create(req.body);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const project = await projectService.update(id, req.body);
      res.json(project);
    } catch (error: any) {
      if (error.message === 'Project not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const project = await projectService.updateStatus(id, status);
      res.json(project);
    } catch (error: any) {
      if (error.message === 'Project not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getTeam(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await projectService.getTeam(id);
      res.json(team);
    } catch (error) {
      next(error);
    }
  }

  async addTeamMember(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const member = await projectService.addTeamMember(id, req.body);
      res.status(201).json(member);
    } catch (error) {
      next(error);
    }
  }

  async removeTeamMember(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id, employeeId } = req.params;
      const member = await projectService.removeTeamMember(id, employeeId);
      res.json(member);
    } catch (error: any) {
      if (error.message === 'Team member not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}
