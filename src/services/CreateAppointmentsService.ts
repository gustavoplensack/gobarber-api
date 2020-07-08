/**
 * This file is responsible for implementing the data processing in a single file
 */
import Appointment from '../models/AppointmentsModel';
import AppointmentsRepository  from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';



interface CreateAppointmentServiceDTO {
    provider:string;

    date:Date;
}

export default class CreateAppointmentService {
    private AppointmentsRepository:AppointmentsRepository;

    constructor(repository:AppointmentsRepository){
        this.AppointmentsRepository = repository;
    }

    public execute({provider,date}:CreateAppointmentServiceDTO):Appointment {

        const appointmentHour = startOfHour(date);

        const isBookedAppointment = this.AppointmentsRepository.findByDate(provider,appointmentHour);

        if (isBookedAppointment) {
            throw Error('This appointment time is already taken! Try another time:)')
        }

        return this.AppointmentsRepository.create({provider,date:appointmentHour});
    }
}
