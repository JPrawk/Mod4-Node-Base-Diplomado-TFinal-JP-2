import express from 'express';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(morgan("combined"))
export default app;
