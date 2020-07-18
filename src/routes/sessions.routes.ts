/**
 * Route for dealing with the sessions inside the app
 */
import { Router, response, request } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService'

const SessionsRouter = Router();

SessionsRouter.post('/',async (request,response)=>{
  try {
    const {email, password} = request.body;

    const authenticateUser = new AuthenticateUserService();

    const {user} = await authenticateUser.execute({
      email,
      password
    });

    delete user.password;

    return response.status(200).json({user})
  } catch (err){
    return response.status(400).json({error:err.message});
  }

});

export default SessionsRouter;
