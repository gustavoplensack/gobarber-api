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
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/middleware/ensureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const UsersRouter = Router();

const upload = multer(uploadConfig);

UsersRouter.post('/', usersController.create);

UsersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default UsersRouter;
