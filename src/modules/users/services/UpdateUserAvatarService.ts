import path from 'path';
import fs from 'fs';
import {getRepository} from 'typeorm';

import User from '../infra/typeorm/entities/UsersModel';
import uploadConfig from '@config/upload';


interface Request {
  userID:string;
  avatarFileName:string;
}

export default class UpdateUserAvatarService {
  public async execute({userID,avatarFileName}:Request): Promise<User> {

    const usersRepo = getRepository(User);

    const user = await usersRepo.findOne(userID);

    // Check if the user exists
    if (!user){
      throw new Error('Only authenticated users can change avatar!');
    }

    // Updating if avatar already exists, in this case old is deleted
    if(user.avatar){
      // checking if exists
      const userAvatarPath = path.join(uploadConfig.dir,user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarPath);

      // deleting old file
      if (userAvatarFileExists){
        await fs.promises.unlink(userAvatarPath);
      }
    }

    // updating path and saving to DB
    user.avatar = avatarFileName;
    usersRepo.save(user);

    return user;
  }
}
