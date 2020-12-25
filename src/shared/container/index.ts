import { container } from 'tsyringe';

import '@modules/users/providers';

import './providers';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmensRepository';
import AppointmenstRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

//  Injects dependency to the appointements repo.
container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmenstRepository,
);

// Injects dependency to the user repo
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

// UserTokens repo injection
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
