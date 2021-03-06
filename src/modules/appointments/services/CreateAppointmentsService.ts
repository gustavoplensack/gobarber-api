/**
 * This file is responsible for implementing the data processing in a single file. In this case,
 * the service implemented here is responsible for creating a new appointment inside the db
 */
import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/error/AppError';
import Appointment from '@modules/appointments/infra/typeorm/entities/AppointmentsModel';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

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

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    customer_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentHour = startOfHour(date);

    if (getHours(appointmentHour) < 8 || getHours(appointmentHour) > 17) {
      throw new AppError(
        "Can't book out of business hours! book them between 8AM and 5PM",
        400,
      );
    }

    if (isBefore(appointmentHour, Date.now())) {
      throw new AppError(`Can't book an apppointment in a past date`, 400);
    }

    if (customer_id === provider_id) {
      throw new AppError("You can't book an appointment with yourself", 400);
    }

    const isBookedAppointment = await this.appointmentsRepository.findByDate(
      appointmentHour,
      provider_id,
    );

    if (isBookedAppointment) {
      throw new AppError(
        'This appointment time is already taken! Try another time:)',
        400,
      );
    }

    const newAppointment = await this.appointmentsRepository.create({
      provider_id,
      customer_id,
      date,
    });

    const dateFormatted = format(newAppointment.date, "dd/MM/yyyy 'às' HH:mm");
    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamente para ${dateFormatted}!`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(date, 'yyyy-M-d')}`,
    );

    return newAppointment;
  }
}
