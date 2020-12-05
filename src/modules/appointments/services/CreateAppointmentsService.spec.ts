import FakeAppointmentsRepository from '../repositories/fakes/FakeAppoitmentsRepository';
import CreateAppointmentsService from './CreateAppointmentsService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointments = new CreateAppointmentsService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointments.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  //   it('should not be able to create two appointments on the same time', () => {
  //     expect(1 + 2).toBe(3);
  //   });
});
