import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppoitmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointmentsService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
      fakeCacheProvider,
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

  it('should use cache on second call', async () => {
    const providerData = {
      id: '123456',
    };

    const cusomerData = {
      id: '111111',
    };

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      date: new Date(2021, 1, 1, 13, 0, 0),
      customer_id: cusomerData.id,
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      date: new Date(2021, 1, 1, 14, 0, 0),
      customer_id: cusomerData.id,
    });

    const appointmentsFirstCall = await listProviderAppointments.execute({
      provider_id: providerData.id,
      day: 1,
      month: 2, // Adjusts to don't use the JS month pattern
      year: 2021,
    });

    const appointmentsSecondCall = await listProviderAppointments.execute({
      provider_id: providerData.id,
      day: 1,
      month: 2, // Adjusts to don't use the JS month pattern
      year: 2021,
    });

    expect(JSON.stringify(appointmentsFirstCall)).toEqual(
      JSON.stringify(appointmentsSecondCall),
    );
  });
});
