import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    // eslint-disable-next-line camelcase
    const customer_id = request.user.id;
    // eslint-disable-next-line camelcase
    const { provider_id, date } = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const createdAppointment = await createAppointmentService.execute({
      provider_id,
      customer_id,
      date,
    });

    return response.json(createdAppointment);
  }
}
