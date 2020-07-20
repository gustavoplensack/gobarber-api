/**
 * This file handles all the routes for the app.
 * To insert a new route, follow the pattern below:
 *
 *  - Create a new file  with the name_of_the_route.routes.ts
 *  - In this file, you create the rules for receiving and
 * reply to your api client;
 *
 */
import { Router, Response, Request, NextFunction } from 'express';
import 'express-async-errors';


import AppointmentsRouter from './appointments.routes';
import UsersRouter from './users.routes';
import SessionRouter from './sessions.routes';
import AppError from '../error/AppError';

const routes = Router();

/**
 * Adding custom routes to the base of the router
 */
routes.use('/users',UsersRouter);
routes.use('/appointments',AppointmentsRouter);
routes.use('/sessions',SessionRouter);

routes.use((err:Error,request:Request,response:Response,_:NextFunction)=>{
    if (err instanceof AppError){
        // Expected app errors
        return response.status(err.statusCode).json({
            status:'error',
            message:err.message
        });
    } else {
        console.error(err)
        // Unexpected errors in the API
        return response.status(500).json({
            status:'error',
            message:'Internal Server Error'
        })
    }
})

export default routes;
