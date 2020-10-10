/**
 * Route for dealing with the sessions inside the app
 */
import { Router, response, request } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'

const SessionsRouter = Router();

SessionsRouter.post('/',async (request,response)=>{
  const {email, password} = request.body;

  const authenticateUser = new AuthenticateUserService();

  const {user,token} = await authenticateUser.execute({
    email,
    password
  });

  delete user.password;

  return response.status(200).json({user,token})

});

export default SessionsRouter;
