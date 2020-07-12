/**
 * This file implements the model of a appointment information
 * in the database.
 * IMPORTANT:
 *  - Always remember to set a interface;
 */
import {EntityRepository, Repository} from 'typeorm';

 import Appointment from '../models/AppointmentsModel';

@EntityRepository(Appointment)
export default class AppointmentsRepository extends Repository<Appointment> {
    /**
     * findByDate
     */
    public async findByDate(provider:string, date:Date): Promise<Appointment | null> {
      const findAppointment = await this.findOne({
        where:{date:date,
        provider:provider}
      });

      return findAppointment || null;
    }
}
