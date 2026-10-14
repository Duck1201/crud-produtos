import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'APIs do projeto',
        description: 'APIs para a comunicação com backend do projeto.',
    },
    host: `127.0.0.1:${process.env.PORT || 3000}`,
    basePath: '/',
    securityDefinitions: {
        apiKeyAuth: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Insira o token JWT neste formato: Bearer <seu_token>',
        },
    },
    tags: [
        {
            name: 'Autenticação',
            description: 'Endpoints responsáveis pelo gerenciamento de acesso e tokens.',
        },
        {
            name: 'Usuários',
            description: 'Endpoints para consulta e manipulação de perfis de usuários.',
        },
        {
            name: 'Observabilidade',
            description: 'Endpoints uteis para monitoramento.',
        },
    ],
};

const outputFile = './swagger-output.json';
const routes = ['./src/routers/*'];

swaggerAutogen()(outputFile, routes, doc);
