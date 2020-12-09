import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import { inject, injectable } from 'tsyringe';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/UsersModel';

interface IRequest {
  userID: string;
  avatarFileName: string;
}
@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({ userID, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userID);

    // Check if the user exists
    if (!user) {
      throw new Error('Only authenticated users can change avatar!');
    }

    // Updating if avatar already exists, in this case old is deleted
    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);

    // updating path and saving to DB
    user.avatar = filename;
    this.usersRepository.save(user);

    return user;
  }
}
