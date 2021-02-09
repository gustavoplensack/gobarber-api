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
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

const AppointmentsRouter = Router();

/*
 * Ensuring usage of authenticated routes
 * for the appointments.
 */
AppointmentsRouter.use(EnsureAuthenticated);

// Controller routing
AppointmentsRouter.post('/', appointmentsController.create);
AppointmentsRouter.get('/me', providerAppointmentsController.index);

export default AppointmentsRouter;
