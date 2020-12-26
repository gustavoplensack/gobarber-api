import AppError from '@shared/error/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import CreateUserService from './CreateUserServices';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await createUser.execute(newUserData);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe(newUserData.name);
    expect(user.email).toBe(newUserData.email);
  });

  it('should not be able to create an user with an already used email', async () => {
    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    await createUser.execute(newUserData);

    await expect(createUser.execute(newUserData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
