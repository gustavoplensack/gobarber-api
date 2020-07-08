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


import AppointmentsRepository from '../repositories/AppointmentsRepository'
const appointmentRepo = new AppointmentsRepository();

import CreateAppointmentService from '../services/CreateAppointmentsService';
import { parseISO } from 'date-fns';

const createAppointmentService = new CreateAppointmentService(appointmentRepo);

const AppointmentsRouter = Router();

AppointmentsRouter.post('/',(request,response)=>{

    const {provider,date} = request.body;

    const dateAsJSDate = parseISO(date);

    try {

        const createdAppointment = createAppointmentService.execute({
            provider,
            date:dateAsJSDate
        });

        response.sendStatus(204);
    }
    catch (err) {
        return response.status(400).json({error:err.message})
    }

});

AppointmentsRouter.get('/',(request,response)=>{
    response.send({appointments:appointmentRepo.all()})
})


export default AppointmentsRouter;
