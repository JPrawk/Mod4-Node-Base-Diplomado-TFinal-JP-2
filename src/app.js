import express from 'express';
import morgan from 'morgan';
import usersRoutes from "./routes/users.route.js";
import authRoutes from "./routes/auth.route.js"
import tasksRoutes from "./routes/tasks.route.js";
import { authenticateToken } from './middlewares/authenticate.middleware.js';
//import "./models/user.js";
//import "./models/task.js";

const app = express();

// Middleware
app.use(morgan("combined"));
app.use(express.json());

//Routes 
app.use("/api/users", usersRoutes);
app.use('/api/tasks/', authenticateToken, tasksRoutes);
app.use("/api/login", authRoutes);
export default app;
