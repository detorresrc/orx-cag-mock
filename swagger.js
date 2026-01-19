const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CAG Management API',
      version: '1.0.0',
      description: 'Mock API for Carrier-Account-Group (CAG) management system',
      contact: {
        name: 'API Support'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'Client',
        description: 'Client and contract management endpoints'
      },
      {
        name: 'CAG',
        description: 'CAG assignment and management endpoints'
      }
    ]
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
