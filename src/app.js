import express from 'express';
import morgan from 'morgan';
import { createRequire } from 'module';
import swaggerSpec from './config/swagger.js';
import usersRoutes from "./routes/users.route.js";
import authRoutes from "./routes/auth.route.js"
import tasksRoutes from "./routes/tasks.route.js";
import { authenticateToken } from './middlewares/authenticate.middleware.js';

// Necesario por incompatibilidad de swagger-ui-express con ES Modules
const require = createRequire(import.meta.url);
const swaggerUi = require('swagger-ui-express');

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes 
app.use("/api/users", usersRoutes);
app.use('/api/tasks/', authenticateToken, tasksRoutes);
app.use("/api/login", authRoutes);

export default app;
