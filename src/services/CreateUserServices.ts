import {getRepository} from 'typeorm';
import {hash} from 'bcryptjs';

import User from '../models/UsersModel';

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
      throw new Error('Email already in use!');
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
