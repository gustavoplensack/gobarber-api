/**
 * Route for dealing with the sessions inside the app
 */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const SessionsRouter = Router();
const sessionController = new SessionsController();

SessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default SessionsRouter;
