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
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated';

const AppointmentsRouter = Router();

/*
 * Ensuring usage of authenticated routes
 * for the appointments.
 */
AppointmentsRouter.use(ensureAuthenticated);

AppointmentsRouter.post('/', async (request, response) => {
  // eslint-disable-next-line camelcase
  const { provider_id, date } = request.body;

  const createAppointmentService = container.resolve(CreateAppointmentService);

  const dateAsJSDate = parseISO(date);

  const createdAppointment = await createAppointmentService.execute({
    provider_id,
    date: dateAsJSDate,
  });

  response.send(createdAppointment);
});

export default AppointmentsRouter;
