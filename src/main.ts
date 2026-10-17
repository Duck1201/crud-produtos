import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { CorsConfigs } from './utils/cors';
import userRoutes from './routes/users-routes';
import systemRoutes from './routes/system-routes';
config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(CorsConfigs));

// Rotas
app.use('/', systemRoutes);
app.use('/users', userRoutes);

// Middlewares basicos
app.use('*any', (_: Request, res: Response) => {
    return res.status(404).json({ statusCode: 404, body: { message: 'Rota não encontrada' } });
});

// Servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${port}\nOnline desde: ${new Date().toLocaleString()}`);
});
