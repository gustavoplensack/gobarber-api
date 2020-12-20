import AppError from '@shared/error/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

import ResetPasswordService from './ResetPasswordService';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
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
    const hasHashedPassword = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: newPassword,
      token: userToken.token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);
    expect(hasHashedPassword).toHaveBeenCalledWith(newPassword);
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

  it('should not be able to reset password with a non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        password: 'na',
        token: 'non-existent',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with a non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate('na-user');

    await expect(
      resetPasswordService.execute({
        token,
        password: 'na',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password for expired token', async () => {
    const testUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await fakeUserRepository.create(testUserData);
    const userToken = await fakeUserTokensRepository.generate(user.id);
    const newPassword = 'alfaces';

    // Mock Date.now value
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: newPassword,
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
