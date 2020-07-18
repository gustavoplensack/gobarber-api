/**
 * This file handles all the routes for the app.
 * To insert a new route, follow the pattern below:
 *
 *  - Create a new file  with the name_of_the_route.routes.ts
 *  - In this file, you create the rules for receiving and
 * reply to your api client;
 *
 */
import { Router } from 'express';


import AppointmentsRouter from './appointments.routes';
import UsersRouter from './users.routes';
import SessionRouter from './sessions.routes';

const routes = Router();

/**
 * Adding custom routes to the base of the router
 */
routes.use('/users',UsersRouter);
routes.use('/appointments',AppointmentsRouter);
routes.use('/sessions',SessionRouter);

export default routes;
