import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';
import EnsureAuthenticated from '@modules/users/infra/middleware/EnsureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const UsersRouter = Router();

const upload = multer(uploadConfig.multer);

UsersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

UsersRouter.patch(
  '/avatar',
  EnsureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default UsersRouter;
