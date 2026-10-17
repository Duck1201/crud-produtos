import { Router } from 'express';
import { UserService } from '../services/users.service';
import { UserController } from '../controllers/users-controller';
import { Validator } from '../utils/validation';
import { createUserSchema } from '../schemas/users-schemas';
import { UserMiddleware } from '../middlewares/users-middleware';

const router = Router();
const createValidation = new UserMiddleware(new Validator(createUserSchema)).handle();
const controller = new UserController(new UserService());

router.get('/', controller.getUsers);
router.post('/', createValidation, controller.createUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);

export default router;
