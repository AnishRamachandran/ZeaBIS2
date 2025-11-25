import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticate } from '../middleware/auth';

const router = Router();
const projectController = new ProjectController();

router.use(authenticate);

router.get('/', (req, res, next) => projectController.getAll(req, res, next));
router.get('/:id', (req, res, next) => projectController.getById(req, res, next));
router.post('/', (req, res, next) => projectController.create(req, res, next));
router.put('/:id', (req, res, next) => projectController.update(req, res, next));
router.patch('/:id/status', (req, res, next) => projectController.updateStatus(req, res, next));
router.get('/:id/team', (req, res, next) => projectController.getTeam(req, res, next));
router.post('/:id/team', (req, res, next) => projectController.addTeamMember(req, res, next));
router.delete('/:id/team/:employeeId', (req, res, next) => projectController.removeTeamMember(req, res, next));

export default router;
