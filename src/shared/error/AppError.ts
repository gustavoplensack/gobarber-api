/**
 * This file implements the app custom error pattern
 * The goal of this class is to implement a form of dealing
 * with expected errors.
 */
export default class Error {

  public readonly message:string;

  public readonly statusCode:number;

  constructor(message:string, statusCode=400){
    this.message = message;
    this.statusCode = statusCode;
  }
}