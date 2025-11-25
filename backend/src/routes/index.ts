import { Router } from 'express';
import authRoutes from './auth.routes';
import customerRoutes from './customer.routes';
import employeeRoutes from './employee.routes';
import projectRoutes from './project.routes';
import { authenticate } from '../middleware/auth';
import {
  TimesheetController,
  InvoiceController,
  ProposalController,
  PurchaseOrderController,
  DashboardController,
} from '../controllers/common.controller';

const router = Router();

const timesheetController = new TimesheetController();
const invoiceController = new InvoiceController();
const proposalController = new ProposalController();
const poController = new PurchaseOrderController();
const dashboardController = new DashboardController();

router.use('/auth', authRoutes);
router.use('/customers', customerRoutes);
router.use('/employees', employeeRoutes);
router.use('/projects', projectRoutes);

const timesheetRouter = Router();
timesheetRouter.use(authenticate);
timesheetRouter.get('/', (req, res, next) => timesheetController.getAll(req, res, next));
timesheetRouter.get('/:id', (req, res, next) => timesheetController.getById(req, res, next));
timesheetRouter.post('/', (req, res, next) => timesheetController.create(req, res, next));
timesheetRouter.put('/:id', (req, res, next) => timesheetController.update(req, res, next));
timesheetRouter.delete('/:id', (req, res, next) => timesheetController.delete(req, res, next));
router.use('/timesheets', timesheetRouter);

const invoiceRouter = Router();
invoiceRouter.use(authenticate);
invoiceRouter.get('/', (req, res, next) => invoiceController.getAll(req, res, next));
invoiceRouter.get('/:id', (req, res, next) => invoiceController.getById(req, res, next));
invoiceRouter.post('/', (req, res, next) => invoiceController.create(req, res, next));
invoiceRouter.put('/:id', (req, res, next) => invoiceController.update(req, res, next));
invoiceRouter.patch('/:id/status', (req, res, next) => invoiceController.updateStatus(req, res, next));
invoiceRouter.get('/:id/details', (req, res, next) => invoiceController.getDetails(req, res, next));
invoiceRouter.post('/:id/details', (req, res, next) => invoiceController.addDetail(req, res, next));
router.use('/invoices', invoiceRouter);

const proposalRouter = Router();
proposalRouter.use(authenticate);
proposalRouter.get('/', (req, res, next) => proposalController.getAll(req, res, next));
proposalRouter.get('/:id', (req, res, next) => proposalController.getById(req, res, next));
proposalRouter.post('/', (req, res, next) => proposalController.create(req, res, next));
proposalRouter.put('/:id', (req, res, next) => proposalController.update(req, res, next));
router.use('/proposals', proposalRouter);

const poRouter = Router();
poRouter.use(authenticate);
poRouter.get('/', (req, res, next) => poController.getAll(req, res, next));
poRouter.get('/:id', (req, res, next) => poController.getById(req, res, next));
poRouter.post('/', (req, res, next) => poController.create(req, res, next));
poRouter.put('/:id', (req, res, next) => poController.update(req, res, next));
poRouter.get('/:id/utilization', (req, res, next) => poController.getUtilization(req, res, next));
router.use('/pos', poRouter);

const dashboardRouter = Router();
dashboardRouter.use(authenticate);
dashboardRouter.get('/stats', (req, res, next) => dashboardController.getStats(req, res, next));
dashboardRouter.get('/revenue', (req, res, next) => dashboardController.getRevenueAnalytics(req, res, next));
router.use('/dashboard', dashboardRouter);

export default router;
