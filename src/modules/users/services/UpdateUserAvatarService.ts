import path from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';

import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/UsersModel';

interface IRequest {
  userID: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ userID, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userID);

    // Check if the user exists
    if (!user) {
      throw new Error('Only authenticated users can change avatar!');
    }

    // Updating if avatar already exists, in this case old is deleted
    if (user.avatar) {
      // checking if exists
      const userAvatarPath = path.join(uploadConfig.dir, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath);

      // deleting old file
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarPath);
      }
    }

    // updating path and saving to DB
    user.avatar = avatarFileName;
    this.usersRepository.save(user);

    return user;
  }
}
