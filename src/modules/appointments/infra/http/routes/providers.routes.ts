/**
 * Route for dealing with the appointments HTTP requisitions
 * In this route, no business or database interfaces should
 * be used. This file just receives the request, calls the request
 * specified processing from another file and returns.
 *
 * For the businness rules, use the src/services;
 * For the API with databases, use the src/repositpories and src/models;
 *
 */
import 'reflect-metadata';
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EnsureAuthenticated from '@modules/users/infra/middleware/EnsureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';

const providerController = new ProvidersController();
const monthAvailabilityController = new ProviderMonthAvailabilityController();
const dayAvailabilityController = new ProviderDayAvailabilityController();

const providersRouter = Router();

/*
 * Ensuring usage of authenticated routes
 * for the appointments.
 */
providersRouter.use(EnsureAuthenticated);

providersRouter.get('/', providerController.index);

providersRouter.get(
  '/:provider_id/month-availability',

  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  monthAvailabilityController.index,
);

providersRouter.get(
  '/:provider_id/day-availability',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required().uuid(),
    },
  }),
  dayAvailabilityController.index,
);

export default providersRouter;
