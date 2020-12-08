import AppError from '@shared/error/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserServices';

describe('AuthenticateUser', () => {
  it('should be able to authenticate an user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    // Temporarty, will be upgraded soon
    const createUSer = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const newUserData = {
      name: 'jose',
      email: 'jose@dascouves.email.com',
      password: 'couves',
    };

    const authUserData = {
      email: 'jose@dascouves.email.com',
      password: 'couves',
    };

    const user = await createUSer.execute(newUserData);

    const response = await authenticateUser.execute(authUserData);

    await expect(response).toHaveProperty('token');
    await expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    // Temporarty, will be upgraded soon
    const createUSer = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const newUserData = {
      name: 'jose',
      email: 'jose@dascouves.email.com',
      password: 'couves',
    };

    const authUserData = {
      email: 'jose@dascouves.email.com',
      password: 'WrongPassword',
    };

    const user = await createUSer.execute(newUserData);

    expect(user.password).toBe(newUserData.password);
    await expect(authenticateUser.execute(authUserData)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should not be able to authenticate a non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const authUserData = {
      email: 'jose@dascouves.email.com',
      password: 'couves',
    };

    await expect(authenticateUser.execute(authUserData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
