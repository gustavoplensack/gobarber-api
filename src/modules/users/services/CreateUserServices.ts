import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/models/IHashProvider';

import User from '../infra/typeorm/entities/UsersModel';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const isEmailAlreadyInUse = await this.usersRepository.findByEmail(email);

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (isEmailAlreadyInUse) {
      throw new AppError('Email already in use!', 400);
    }

    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return newUser;
  }
}
