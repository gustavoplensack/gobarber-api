import { hash } from 'bcryptjs';

import AppError from '@shared/error/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/UsersModel';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const isEmailAlreadyInUse = await this.usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);

    if (isEmailAlreadyInUse) {
      throw new AppError('Email already in use!', 400);
    }

    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return newUser;
  }
}
