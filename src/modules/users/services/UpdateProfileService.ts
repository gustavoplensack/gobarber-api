import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/UsersModel';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvidder')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    // checks if the email has changed
    if (email !== user.email) {
      const isEmailTaken = await this.usersRepository.findByEmail(email);

      if (isEmailTaken) {
        throw new AppError('Email already in use.');
      }
    }

    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Old password not provided');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Wrong old password!');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}
