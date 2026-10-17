import type { CorsOptions } from 'cors';

export const CorsConfigs: CorsOptions = {
    methods: ['POST', 'PUT', 'PATCH', 'DELETE', 'GET'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    origin: [process.env.FRONTEND!],
    credentials: true,
};
