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
import { Router, response, request } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserServices';
import ensureAuthenticated from '../middleware/ensureAuthenticated';

const UsersRouter = Router();

const upload = multer(uploadConfig);

UsersRouter.post('/',async (request,response)=>{

  const {name, email, password} = request.body;

  const createUser = new CreateUserService();

  try {

    const newUser = await createUser.execute({
      name,
      email,
      password
    });

    delete newUser.password;

    response.json(newUser);
  }
  catch (err) {
    return response.status(400).json({error:err.message})
  }

});

UsersRouter.patch('/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async(request,response)=>{
    return response.json({ok:true});
});

export default UsersRouter;
