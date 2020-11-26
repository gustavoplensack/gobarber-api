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
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated';

const AppointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();
/*
 * Ensuring usage of authenticated routes
 * for the appointments.
 */
AppointmentsRouter.use(ensureAuthenticated);

AppointmentsRouter.post('/', async (request, response) => {
  // eslint-disable-next-line camelcase
  const { provider_id, date } = request.body;

  const createAppointmentService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const dateAsJSDate = parseISO(date);

  const createdAppointment = await createAppointmentService.execute({
    provider_id,
    date: dateAsJSDate,
  });

  response.send(createdAppointment);
});

export default AppointmentsRouter;
