import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppoitmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list day availability from provider', async () => {
    const providerData = {
      id: '123456',
    };

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      date: new Date(2021, 1, 1, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      date: new Date(2021, 1, 1, 14, 0, 0),
    });

    // mocks Date.now implementation for this test
    jest.spyOn(Date, 'now').mockImplementation(() => {
      return new Date(2021, 1, 1, 10).getTime();
    });

    const dayAvailability = await listProviderDayAvailability.execute({
      provider_id: providerData.id,
      day: 1,
      month: 2, // Adjusts to don't use the JS month pattern
      year: 2021,
    });

    expect(dayAvailability).toEqual(
      expect.arrayContaining([
        { hour: 8, availability: false },
        { hour: 9, availability: false },
        { hour: 10, availability: false },
        { hour: 11, availability: true },
        { hour: 12, availability: true },
        { hour: 13, availability: false },
        { hour: 14, availability: false },
        { hour: 15, availability: true },
      ]),
    );
  });
});
