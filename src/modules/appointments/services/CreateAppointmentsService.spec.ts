import AppError from '@shared/error/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeNotificationsRepositoty from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepositoty: FakeNotificationsRepositoty;
let createAppointments: CreateAppointmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeCacheProvider = new FakeCacheProvider();
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepositoty = new FakeNotificationsRepositoty();
    createAppointments = new CreateAppointmentsService(
      fakeAppointmentsRepository,
      fakeNotificationsRepositoty,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2000, 0, 1, 12).getTime();
    });
    const appointment = await createAppointments.execute({
      date: new Date(2020, 0, 1, 13),
      provider_id: '123123',
      customer_id: '111111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2000, 0, 1, 12).getTime();
    });

    const appointmentDate = new Date(2020, 0, 1, 12);

    await createAppointments.execute({
      date: appointmentDate,
      provider_id: '123123',
      customer_id: '1111111',
    });

    await expect(
      createAppointments.execute({
        date: appointmentDate,
        provider_id: '123123',
        customer_id: '1111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments with yourself', async () => {
    const appointmentDate = new Date(2020, 0, 1, 12);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2000, 0, 1).getTime();
    });

    await expect(
      createAppointments.execute({
        date: appointmentDate,
        provider_id: '123123',
        customer_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to book appointments out of business hours', async () => {
    await expect(
      createAppointments.execute({
        customer_id: '111111',
        provider_id: '123123',
        date: new Date(2020, 0, 2, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointments.execute({
        customer_id: '111111',
        provider_id: '123123',
        date: new Date(2020, 0, 2, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment in a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 0, 1, 12).getTime();
    });

    const appointmentDate = new Date(2020, 0, 1, 12);

    await expect(
      createAppointments.execute({
        date: appointmentDate,
        provider_id: '123123',
        customer_id: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
