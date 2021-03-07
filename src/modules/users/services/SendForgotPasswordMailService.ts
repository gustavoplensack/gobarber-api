import path from 'path';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/error/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordMailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const foundUser = await this.usersRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError('User not found!');
    }

    const { token } = await this.userTokensRepository.generate(foundUser.id);
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'templates',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: { name: foundUser.name, email: foundUser.email },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: foundUser.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}
