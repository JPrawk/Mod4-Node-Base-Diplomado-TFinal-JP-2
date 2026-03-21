import swaggerJsdoc from 'swagger-jsdoc';
import { writeFileSync } from 'fs';
import yaml from 'js-yaml';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mi API - Dip Mod 4 Juan Pablo Guzman',
      version: '1.0.0',
      description: 'Documentación de la API',
      contact: {
        name: 'Juan Guzman',
        email: 'juan@email.com',
        url: 'https://github.com/tu-usuario'
      },
      license: {
        name: 'MIT',
      }
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Desarrollo' },
      { url: 'https://tu-app.onrender.com', description: 'Producción' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        // ─── USER ───────────────────────────────────────
        User: {
          type: 'object',
          properties: {
            id:     { type: 'integer', example: 1 },
            name:   { type: 'string',  example: 'Juan Guzman' },
            email:  { type: 'string',  format: 'email', example: 'juan@email.com' },
            active: { type: 'boolean', example: true },
          }
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name:     { type: 'string', example: 'Juan Guzman' },
            email:    { type: 'string', format: 'email', example: 'juan@email.com' },
            password: { type: 'string', format: 'password', example: '123456' },
          }
        },
        // ─── TASK ───────────────────────────────────────
        Task: {
          type: 'object',
          properties: {
            id:          { type: 'integer', example: 1 },
            title:       { type: 'string',  example: 'Mi tarea' },
            description: { type: 'string',  example: 'Descripción de la tarea' },
            done:        { type: 'boolean', example: false },
          }
        },
        TaskInput: {
          type: 'object',
          required: ['title'],
          properties: {
            title:       { type: 'string', example: 'Mi tarea' },
            description: { type: 'string', example: 'Descripción de la tarea' },
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

// Genera el swagger.yaml en la raíz del proyecto
writeFileSync('./swagger.yaml', yaml.dump(swaggerSpec), 'utf8');
console.log('✅ swagger.yaml generado');

export default swaggerSpec;