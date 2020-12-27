/**
 * This file handles all the routes for the app.
 * To insert a new route, follow the pattern below:
 *
 *  - Create a new file  with the name_of_the_route.routes.ts
 *  - In this file, you create the rules for receiving and
 * reply to your api client;
 *
 */
import { Router, Response, Request, NextFunction } from 'express';
import 'express-async-errors';

import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import UsersRouter from '@modules/users/infra/http/routes/users.routes';
import SessionRouter from '@modules/users/infra/http/routes/sessions.routes';
import PasswordRouter from '@modules/users/infra/http/routes/password.routes';
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes';
import ProvidersRouter from '@modules/appointments/infra/http/routes/providers.routes';
import AppError from '@shared/error/AppError';

const routes = Router();

/**
 * Adding custom routes to the base of the router
 */
routes.use('/users', UsersRouter);
routes.use('/appointments', AppointmentsRouter);
routes.use('/sessions', SessionRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);
routes.use('/providers', ProvidersRouter);

/**
 * Global error handling middleware
 */
routes.use(
  (err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      // Expected app errors
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.error(err);
    // Unexpected errors in the API
    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  },
);

export default routes;
