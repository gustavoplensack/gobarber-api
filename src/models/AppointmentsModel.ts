/**
 * This file implements the model of a appointment information
 * in the database.
 * IMPORTANT:
 *  - Always remember to set a interface;
 */
import {uuid} from 'uuidv4';

interface AppointmentInstantiateDTO  {
    provider: string;

    date: Date;
}

export default class Appointment{
    id:string;

    provider: string;

    date: Date;

    constructor({provider, date}:AppointmentInstantiateDTO){
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}
