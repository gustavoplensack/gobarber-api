/**
 * Route for dealing with the appointments HTTP requisitions
 * In this route, no business or database interfaces should
 * be used. This file just receives the request, calls the request
 * specified processing from another file and returns.
 *
 * For the businness rules, use the src/services;
 * For the API with databases, use the src/repositpories and src/models;
 *
 */
import 'reflect-metadata';
import { Router } from 'express';

import EnsureAuthenticated from '@modules/users/infra/middleware/EnsureAuthenticated';
import AppointmentsController from '../controllers/AppointmentController';

const appointmentsController = new AppointmentsController();

const AppointmentsRouter = Router();

/*
 * Ensuring usage of authenticated routes
 * for the appointments.
 */
AppointmentsRouter.use(EnsureAuthenticated);

AppointmentsRouter.post('/', appointmentsController.create);

export default AppointmentsRouter;
