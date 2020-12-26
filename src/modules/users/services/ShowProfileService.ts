import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/UsersModel';

interface IRequest {
  user_id: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found');
    }

    delete user.password;
    return user;
  }
}
