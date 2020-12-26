import AppError from '@shared/error/AppError';

import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the user profile avatar', async () => {
    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await fakeUsersRepository.create(newUserData);

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'jose@dasalfaces.email.com',
      name: 'Joselito',
    });

    expect(updatedUser.name).toBe('Joselito');
    expect(updatedUser.email).toBe('jose@dasalfaces.email.com');
  });

  it('should not be able to use an already taken email', async () => {
    const userData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const anotherUserData = {
      email: 'joselito@dasalfaces.email.com',
      name: 'joseito',
      password: 'alfaces',
    };

    const user = await fakeUsersRepository.create(userData);
    const anotherUser = await fakeUsersRepository.create(anotherUserData);

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: anotherUser.email,
        name: 'jose',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const userData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const newPassword = 'alfaces';

    const user = await fakeUsersRepository.create(userData);

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: user.name,
      email: user.email,
      old_password: userData.password,
      password: newPassword,
    });

    expect(updatedUser.password).toBe(newPassword);
  });

  it('should not be able to update the password without old password', async () => {
    const userData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const newPassword = 'alfaces';

    const user = await fakeUsersRepository.create(userData);

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        password: newPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const userData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const newPassword = 'alfaces';

    const user = await fakeUsersRepository.create(userData);

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: user.name,
        email: user.email,
        old_password: 'wrong-old-password',
        password: newPassword,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
