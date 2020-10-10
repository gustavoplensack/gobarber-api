import {getRepository} from 'typeorm';
import {hash} from 'bcryptjs';

import User from '../infra/typeorm/entities/UsersModel';
import AppError from '@shared/error/AppError';

interface UserRequest {
  name:string;

  email:string;

  password: string;
}

export default class CreateUserService {
  /**
   * execute method: saves a user into the DB
   */
  public async execute({name,email,password}:UserRequest): Promise<User> {

    const userRepo = getRepository(User);

    const isEmailAlreadyInUse = await userRepo.findOne({
      where: {email}
    });

    const hashedPassword = await hash(password,8);

    if (isEmailAlreadyInUse){
      throw new AppError('Email already in use!',400);
    }

    const newUser = userRepo.create({
      name,
      email,
      password:hashedPassword
    });

    await userRepo.save(newUser);

    return newUser;
  }
}
