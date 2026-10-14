import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../swagger-output.json';
import { Router } from 'express';

const router = Router();

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default router;
