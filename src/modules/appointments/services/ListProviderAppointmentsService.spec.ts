import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppoitmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list provider appointments', async () => {
    const providerData = {
      id: '123456',
    };

    const cusomerData = {
      id: '111111',
    };

    const appointmentOne = await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      date: new Date(2021, 1, 1, 13, 0, 0),
      customer_id: cusomerData.id,
    });

    const appointmentTwo = await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      date: new Date(2021, 1, 1, 14, 0, 0),
      customer_id: cusomerData.id,
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: providerData.id,
      day: 1,
      month: 2, // Adjusts to don't use the JS month pattern
      year: 2021,
    });

    expect(appointments).toEqual(
      expect.arrayContaining([appointmentOne, appointmentTwo]),
    );
  });
});
