/**
 * This file implements the model of a appointment information
 * in the database.
 * IMPORTANT:
 *  - Always remember to set a interface;
 */
import { Repository, getRepository, Raw } from 'typeorm';

import IAppointemntsRepository from '@modules/appointments/repositories/IAppointmensRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';
import Appointment from '../entities/AppointmentsModel';

class AppointmentsRepository implements IAppointemntsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const paddedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${paddedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const paddedDay = String(day).padStart(2, '0');
    const paddedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${paddedDay}-${paddedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });

    return appointments;
  }

  public async create({
    provider_id,
    date,
    customer_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      provider_id,
      customer_id,
      date,
    });

    this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
