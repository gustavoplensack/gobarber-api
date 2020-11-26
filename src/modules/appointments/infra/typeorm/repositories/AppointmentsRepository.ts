/**
 * This file implements the model of a appointment information
 * in the database.
 * IMPORTANT:
 *  - Always remember to set a interface;
 */
import { Repository, getRepository } from 'typeorm';

import IAppointemntsRepository from '@modules/appointments/repositories/IAppointmensRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import Appointment from '../entities/AppointmentsModel';

class AppointmentsRepository implements IAppointemntsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    // eslint-disable-next-line camelcase
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    this.ormRepository.save(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
