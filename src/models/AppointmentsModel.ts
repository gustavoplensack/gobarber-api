/**
 * This file implements the model of a appointment information
 * in the database.
 * IMPORTANT:
 *  - Always remember to set a interface;
 */
import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'
@Entity('appointments')
export default class Appointment{

  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}
