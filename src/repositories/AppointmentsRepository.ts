/**
 * This file implements the model of a appointment information
 * in the database.
 * IMPORTANT:
 *  - Always remember to set a interface;
 */
import Appointment from '../models/AppointmentsModel';
import {isEqual} from 'date-fns'

interface AppointmentDTO {
    provider:string;

    date: Date;

    id:string;
}


export default class AppointmentsRepository {
    private appointments: Appointment[];

    constructor(){
        /**
         * Instantiates the connection the DB, in this case the DB is kept
         * in the memory during the run time
         */
        this.appointments = [];
    }

    /**
     * all
     */
    public all():Appointment[] {
        /**
         * Returns all the appointments in the
         * DB;
         */
        return this.appointments;
    }

    /**
     * findByDate
     */
    public findByDate(provider:string, date:Date): Appointment | null {

        const findAppointment = this.appointments.find(appointment =>{
            if (isEqual(date,appointment.date) && provider == appointment.provider){
                return true;
            }
        });

        return findAppointment || null;
    }

    /**
     * create
     */
    public create(data: Omit<AppointmentDTO,'id'>):Appointment {
        const appointment = new Appointment(data);

        this.appointments.push(appointment);

        return appointment;
    }
}
