import AppError from '@shared/error/AppError';

import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should show the user profile', async () => {
    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const user = await fakeUsersRepository.create(newUserData);

    const userProfile = await showProfile.execute({
      user_id: user.id,
    });

    expect(userProfile.name).toBe(newUserData.name);
    expect(userProfile.email).toBe(newUserData.email);
    expect(userProfile.password).toBe(undefined);
  });

  it('should throw error if user_id does not exist', async () => {
    const newUserData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    await fakeUsersRepository.create(newUserData);

    await expect(
      showProfile.execute({
        user_id: 'not-an-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
