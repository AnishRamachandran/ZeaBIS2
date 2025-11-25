import { Router } from 'express';
import { CustomerController } from '../controllers/customer.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const customerController = new CustomerController();

router.use(authenticate);

router.get('/', (req, res, next) => customerController.getAll(req, res, next));
router.get('/:id', (req, res, next) => customerController.getById(req, res, next));
router.post('/', (req, res, next) => customerController.create(req, res, next));
router.put('/:id', (req, res, next) => customerController.update(req, res, next));
router.delete('/:id', (req, res, next) => customerController.delete(req, res, next));
router.get('/:id/projects', (req, res, next) => customerController.getProjects(req, res, next));

export default router;
