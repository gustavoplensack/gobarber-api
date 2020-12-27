import AppError from '@shared/error/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list providers', async () => {
    const userData = {
      email: 'jose@dascouves.email.com',
      name: 'jose',
      password: 'couves',
    };

    const firstProviderData = {
      email: 'jose@dasalfaces.email.com',
      name: 'jose',
      password: 'alfaces',
    };

    const secondProviderData = {
      email: 'jose@dasbeterrabas.email.com',
      name: 'jose',
      password: 'beterrabas',
    };

    const user = await fakeUsersRepository.create(userData);
    const firstProvider = await fakeUsersRepository.create(firstProviderData);
    const secondProvider = await fakeUsersRepository.create(secondProviderData);

    const providers = await listProviders.execute({
      user_id: user.id,
    });

    expect(providers).toEqual([firstProvider, secondProvider]);
  });
});
