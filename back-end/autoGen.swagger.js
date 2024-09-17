const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: "Backend - Revisão",
      description: "Documentação do projeto de revisão usando Express e Sequelize",
      version: "1.0.0"
    },
    host: process.env.APP_PORT,
    security: [{"apiKeyAuth": []}],
    securityDefinitions: {
      apiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description: "Insira o token JWT"
      }
    }
};

const outputFile = './src/routes/doc.swagger.json';
const routes = ['./src/routes/routes.js'];

swaggerAutogen(outputFile, routes, doc);