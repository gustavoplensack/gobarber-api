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
import { Router, response, request } from 'express';
import {getCustomRepository} from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated';

const AppointmentsRouter = Router();

/*
 * Ensuring usage of authenticated routes
 * for the appointments.
*/
AppointmentsRouter.use(ensureAuthenticated);

AppointmentsRouter.post('/',async (request,response)=>{

  const {provider_id,date} = request.body;

  const createAppointmentService = new CreateAppointmentService();

  const dateAsJSDate = parseISO(date);

  const createdAppointment = await createAppointmentService.execute({
      provider_id,
      date:dateAsJSDate
  });

  response.send(createdAppointment);

});

AppointmentsRouter.get('/',async (request,response)=>{
  const appointmentRepo = getCustomRepository(AppointmentsRepository);
  response.send({appointments:await appointmentRepo.find()})
})


export default AppointmentsRouter;
