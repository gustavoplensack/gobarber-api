/**
 * Overriding the Express request definition
 * to include the user as one of it's characteristics
 */

declare namespace Express {
  export interface Request{
    user:{
      id:string;
    };
  }
}
