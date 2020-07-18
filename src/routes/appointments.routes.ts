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

import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentsService';

import ensureAuthenticated from '../middleware/ensureAuthenticated';

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

  try {

      const createdAppointment = await createAppointmentService.execute({
          provider_id,
          date:dateAsJSDate
      });

      response.send(createdAppointment);
  }
  catch (err) {
      return response.status(400).json({error:err.message})
  }

});

AppointmentsRouter.get('/',async (request,response)=>{
  const appointmentRepo = getCustomRepository(AppointmentsRepository);
  response.send({appointments:await appointmentRepo.find()})
})


export default AppointmentsRouter;
