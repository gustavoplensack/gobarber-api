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


import AppointmentsRepository from '../repositories/AppointmentsRepository'

import CreateAppointmentService from '../services/CreateAppointmentsService';
import { parseISO } from 'date-fns';

const AppointmentsRouter = Router();

AppointmentsRouter.post('/',async (request,response)=>{

  const {provider,date} = request.body;

  const createAppointmentService = new CreateAppointmentService();

  const dateAsJSDate = parseISO(date);

  try {

      const createdAppointment = await createAppointmentService.execute({
          provider,
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
