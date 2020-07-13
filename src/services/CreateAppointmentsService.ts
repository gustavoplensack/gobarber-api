/**
 * This file is responsible for implementing the data processing in a single file. In this case,
 * the service implemented here is responsible for creating a new appointment inside the db
 */
import { startOfHour } from 'date-fns';
import {getCustomRepository} from 'typeorm';

import Appointment from '../models/AppointmentsModel';
import AppointmentsRepository  from '../repositories/AppointmentsRepository';

interface CreateAppointmentServiceDTO {
    provider_id:string;

    date:Date;
}

export default class CreateAppointmentService {

  public async execute({provider_id,date}:CreateAppointmentServiceDTO): Promise<Appointment> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentHour = startOfHour(date);

    const isBookedAppointment = await appointmentsRepository.findByDate(provider_id,appointmentHour);

    if (isBookedAppointment) {
        throw Error('This appointment time is already taken! Try another time:)')
    }

    const newAppointment = appointmentsRepository.create({
      provider_id,
      date:appointmentHour
    });

    await appointmentsRepository.save(newAppointment);

    return newAppointment;
  }
}
