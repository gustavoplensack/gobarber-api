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

import CreateUserService from '../services/CreateUserServices';

const UsersRouter = Router();

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

export default UsersRouter;
