import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailability from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProvidersDayAvailability = container.resolve(
      ListProviderDayAvailability,
    );

    const providers = await listProvidersDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(providers);
  }
}
