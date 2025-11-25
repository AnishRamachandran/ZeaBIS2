import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const employeeController = new EmployeeController();

router.use(authenticate);

router.get('/', (req, res, next) => employeeController.getAll(req, res, next));
router.get('/:id', (req, res, next) => employeeController.getById(req, res, next));
router.post('/', (req, res, next) => employeeController.create(req, res, next));
router.put('/:id', (req, res, next) => employeeController.update(req, res, next));
router.patch('/:id/status', (req, res, next) => employeeController.updateStatus(req, res, next));
router.get('/:id/timesheets', (req, res, next) => employeeController.getTimesheets(req, res, next));
router.get('/:id/projects', (req, res, next) => employeeController.getProjects(req, res, next));

export default router;
