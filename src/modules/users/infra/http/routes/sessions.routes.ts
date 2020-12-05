/**
 * Route for dealing with the sessions inside the app
 */
import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const SessionsRouter = Router();
const sessionController = new SessionsController();

SessionsRouter.post('/', sessionController.create);

export default SessionsRouter;
