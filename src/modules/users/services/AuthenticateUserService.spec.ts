import AppError from '@shared/error/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate an user', async () => {
    const newUserData = {
      name: 'jose',
      email: 'jose@dascouves.email.com',
      password: 'couves',
    };

    const authUserData = {
      email: 'jose@dascouves.email.com',
      password: 'couves',
    };

    const user = await fakeUserRepository.create(newUserData);

    const response = await authenticateUser.execute(authUserData);

    await expect(response).toHaveProperty('token');
    await expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const newUserData = {
      name: 'jose',
      email: 'jose@dascouves.email.com',
      password: 'couves',
    };

    const authUserData = {
      email: 'jose@dascouves.email.com',
      password: 'WrongPassword',
    };

    const user = await fakeUserRepository.create(newUserData);

    expect(user.password).toBe(newUserData.password);
    await expect(authenticateUser.execute(authUserData)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to authenticate a non existing user', async () => {
    const authUserData = {
      email: 'jose@dascouves.email.com',
      password: 'couves',
    };

    await expect(authenticateUser.execute(authUserData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
