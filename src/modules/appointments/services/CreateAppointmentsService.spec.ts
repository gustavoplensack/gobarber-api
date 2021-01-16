import AppError from '@shared/error/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointments: CreateAppointmentsService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointments = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointments.execute({
      date: new Date(),
      provider_id: '123123',
      customer_id: '111111',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointments.execute({
      date: appointmentDate,
      provider_id: '123123',
      customer_id: '1111111',
    });

    expect(
      createAppointments.execute({
        date: appointmentDate,
        provider_id: '123123',
        customer_id: '1111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointments with itself', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    expect(
      createAppointments.execute({
        date: appointmentDate,
        provider_id: '123123',
        customer_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
