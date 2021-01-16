/**
 * This file is responsible for implementing the data processing in a single file. In this case,
 * the service implemented here is responsible for creating a new appointment inside the db
 */
import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/AppointmentsModel';
import AppError from '@shared/error/AppError';
import IAppointmentsRepository from '../repositories/IAppointmensRepository';

import '@modules/appointments/dtos/ICreateAppointmentsDTO';

// NOTE: the customer id is equivalent to the current user id
interface IRequest {
  provider_id: string;
  customer_id: string;
  date: Date;
}
@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    customer_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentHour = startOfHour(date);

    const isBookedAppointment = await this.appointmentsRepository.findByDate(
      appointmentHour,
    );

    if (isBookedAppointment) {
      throw new AppError(
        'This appointment time is already taken! Try another time:)',
        400,
      );
    }

    const newAppointment = this.appointmentsRepository.create({
      provider_id,
      customer_id,
      date: appointmentHour,
    });

    return newAppointment;
  }
}
