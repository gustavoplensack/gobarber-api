/**
 * Service to deal with the user authentication task
 */
import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

import User from '../models/UsersModel';

interface  Request {
  email:string;
  password:string;
}

interface  Response {
  user:User;
  token:string;
}

class AuthenticateUserService {
  public async execute({email,password}:Request):Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where:{email}});

    if (!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password,user.password);

    if(!passwordMatched){
      throw new Error('Incorrect email/password combinattion.');
    }

    const token = sign({},'d41d8cd98f00b204e9800998ecf8427e',{
      subject:user.id,
      expiresIn:'1d',
    })

    return {
      user,
      token
    };

  }
}


export default AuthenticateUserService;
