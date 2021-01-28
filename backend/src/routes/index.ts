import { Router } from 'express';

import appointmentRouter from './appointments.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';


const routes = Router();


routes.use('/appointments', appointmentRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);



export default routes
