/**
 * Middleware that implements authenticated acess to routes using bearer
 * bearer token.
 */
import {Request,Response,NextFunction} from 'express';
import {verify} from 'jsonwebtoken';

import authConfig from '../config/auth';
import AppError from '../error/AppError';

interface TokenPaylod {
  iat:Number;
  exp:Number;
  sub:string;
}

export default function ensureAuthenticated(
    request:Request,
    response:Response,
    next:NextFunction
    ):void {
  const authHeader = request.headers.authorization;

  if (!authHeader){
      throw new AppError('JWT is missing in request.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token,authConfig.jwt.secret);

    // Forcing the return to be interpreted as the format described in interface
    const {sub} = decodedToken as TokenPaylod;

    request.user = {
      id:sub
    };

    return next()

  } catch(err) {
    throw new AppError('Invalid JWT token.')
  }


}
