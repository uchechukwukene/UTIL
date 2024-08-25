import 'express-async-errors';
import 'dotenv/config';
// import './db/connection.js';
import express, { Router, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';
import env from './config/env.js';
import baseRoutes from './routes/index.js';
import { ErrorHandler } from './middlewares/errorHandler.js';
// import { checkloanRepayments } from './jobs/loan.cronjob.js';
// import { socketBlock } from './jobs/socketio.js';
// import { monthlyactivationCheck, onboardingTrialCheck } from './jobs/onboard.cronjob.js';

const router = Router();
const rootRouter = baseRoutes(router);

const app = express();

// Increase file size limit to 50MB
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

const server = http.createServer(app);

let routePath;
if (env.node_env === 'production') {
  routePath = '/prod/sockets';
} else {
  routePath = '/stag/sockets';
}

let io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] }
});

io = io.of(routePath);

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(morgan('combined'));

const port = env.port;


socketBlock({ io });

if (env.node_env === 'production') {
  // routes
  app.use('/api/v1/organization', rootRouter);
} else {
  // routes
  app.use('/api/v1/organization/stag', rootRouter);
}

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Resource URL not found', success: false, data: null });
});

// Error handlers
app.use(ErrorHandler);

server.listen(port, () => {
  console.log(`🥂server dey function for port ${port}🥂`);
});
