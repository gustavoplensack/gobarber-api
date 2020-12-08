import AppError from '@shared/error/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import CreateUserService from './CreateUserServices';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUSer = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await createUSer.execute(newUserData);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(newUserData.name);
    expect(user.email).toBe(newUserData.email);
  });

  it('should not be able to create an user with an already used email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUSer = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    await createUSer.execute(newUserData);

    await expect(createUSer.execute(newUserData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
