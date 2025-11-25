import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { TimesheetService } from '../services/timesheet.service';
import { InvoiceService } from '../services/invoice.service';
import { ProposalService, PurchaseOrderService, DashboardService } from '../services/common.service';

const timesheetService = new TimesheetService();
const invoiceService = new InvoiceService();
const proposalService = new ProposalService();
const poService = new PurchaseOrderService();
const dashboardService = new DashboardService();

export class TimesheetController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const filters = {
        employeeId: req.query.employeeId as string,
        projectId: req.query.projectId as string,
      };
      const timesheets = await timesheetService.getAll(filters);
      res.json(timesheets);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const timesheet = await timesheetService.getById(id);
      res.json(timesheet);
    } catch (error: any) {
      if (error.message === 'Timesheet not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const timesheet = await timesheetService.create(req.body);
      res.status(201).json(timesheet);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const timesheet = await timesheetService.update(id, req.body);
      res.json(timesheet);
    } catch (error: any) {
      if (error.message === 'Timesheet not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async delete(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await timesheetService.delete(id);
      res.status(204).send();
    } catch (error: any) {
      if (error.message === 'Timesheet not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}

export class InvoiceController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const filters = {
        status: req.query.status as string,
        poId: req.query.poId as string,
      };
      const invoices = await invoiceService.getAll(filters);
      res.json(invoices);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const invoice = await invoiceService.getById(id);
      res.json(invoice);
    } catch (error: any) {
      if (error.message === 'Invoice not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const invoice = await invoiceService.create(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const invoice = await invoiceService.update(id, req.body);
      res.json(invoice);
    } catch (error: any) {
      if (error.message === 'Invoice not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async updateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const invoice = await invoiceService.updateStatus(id, status);
      res.json(invoice);
    } catch (error: any) {
      if (error.message === 'Invoice not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getDetails(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const details = await invoiceService.getDetails(id);
      res.json(details);
    } catch (error) {
      next(error);
    }
  }

  async addDetail(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const detail = await invoiceService.addDetail(id, req.body);
      res.status(201).json(detail);
    } catch (error) {
      next(error);
    }
  }
}

export class ProposalController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const proposals = await proposalService.getAll();
      res.json(proposals);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const proposal = await proposalService.getById(id);
      res.json(proposal);
    } catch (error: any) {
      if (error.message === 'Proposal not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const proposal = await proposalService.create(req.body);
      res.status(201).json(proposal);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const proposal = await proposalService.update(id, req.body);
      res.json(proposal);
    } catch (error: any) {
      if (error.message === 'Proposal not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}

export class PurchaseOrderController {
  async getAll(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const pos = await poService.getAll();
      res.json(pos);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const po = await poService.getById(id);
      res.json(po);
    } catch (error: any) {
      if (error.message === 'Purchase order not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const po = await poService.create(req.body);
      res.status(201).json(po);
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const po = await poService.update(id, req.body);
      res.json(po);
    } catch (error: any) {
      if (error.message === 'Purchase order not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getUtilization(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const utilization = await poService.getUtilization(id);
      res.json(utilization);
    } catch (error: any) {
      if (error.message === 'Purchase order not found') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}

export class DashboardController {
  async getStats(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const stats = await dashboardService.getStats();
      res.json(stats);
    } catch (error) {
      next(error);
    }
  }

  async getRevenueAnalytics(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const analytics = await dashboardService.getRevenueAnalytics();
      res.json(analytics);
    } catch (error) {
      next(error);
    }
  }
}
