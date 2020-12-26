import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import EnsureAuthenticated from '@modules/users/infra/middleware/EnsureAuthenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();
const UsersRouter = Router();

const upload = multer(uploadConfig);

UsersRouter.post('/', usersController.create);

UsersRouter.patch(
  '/avatar',
  EnsureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default UsersRouter;
