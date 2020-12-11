import AppError from '@shared/error/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import SendForgotPasswordMailService from './SendForgotPasswordMailService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordMail: SendForgotPasswordMailService;

describe('SendForgotPasswordMail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordMail = new SendForgotPasswordMailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password for a given email', async () => {
    const hasSentMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const testUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    await fakeUserRepository.create(testUserData);

    await sendForgotPasswordMail.execute({ email: testUserData.email });

    expect(hasSentMail).toHaveBeenCalled();
  });

  it('should not be able to recover the password of a non-existing user', async () => {
    const testUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    await expect(
      sendForgotPasswordMail.execute({ email: testUserData.email }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const hasGeneratedToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const testUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await fakeUserRepository.create(testUserData);

    await sendForgotPasswordMail.execute({ email: testUserData.email });

    expect(hasGeneratedToken).toHaveBeenCalledWith(user.id);
  });
});
