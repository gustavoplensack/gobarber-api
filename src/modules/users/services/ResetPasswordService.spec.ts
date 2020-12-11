import AppError from '@shared/error/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
    );
  });

  it('should be able to reset password', async () => {
    const testUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await fakeUserRepository.create(testUserData);
    const userToken = await fakeUserTokensRepository.generate(user.id);
    const newPassword = 'alfaces';

    await resetPasswordService.execute({
      password: newPassword,
      token: userToken.token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe(newPassword);
  });

  it('should not be able to reset password using the same password', async () => {
    const testUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await fakeUserRepository.create(testUserData);
    const userToken = await fakeUserTokensRepository.generate(user.id);

    await expect(
      resetPasswordService.execute({
        password: user.password,
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

// Check hash
// 2h de expiração
// userToken e User inexistente
// mesma senha de novo não pode
