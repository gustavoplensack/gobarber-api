import AppError from '@shared/error/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

describe('UpdateUserAvatar', () => {
  it('should be able update user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await fakeUsersRepository.create(newUserData);

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFileName: 'file.jpg',
    });

    expect(user.avatar).toBe('file.jpg');
  });

  it('should not be able to update avatar from non-existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    await expect(
      updateUserAvatar.execute({
        userID: 'n/a',
        avatarFileName: 'file.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating to a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFileFn = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await fakeUsersRepository.create(newUserData);

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFileName: 'file.jpg',
    });

    await updateUserAvatar.execute({
      userID: user.id,
      avatarFileName: 'file2.jpg',
    });

    expect(deleteFileFn).toHaveBeenCalledWith('file.jpg');
    expect(user.avatar).toBe('file2.jpg');
  });
});
