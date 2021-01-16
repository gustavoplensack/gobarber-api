import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppoitmentsRepository';
import ListProviderMonthAvailability from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailability;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailability(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list month availability from provider', async () => {
    const providerData = {
      id: '123456',
    };

    const customerData = {
      id: '111111',
    };

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 1, 17, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 13, 0, 0),
    });

    const monthAvailability = await listProviderMonthAvailability.execute({
      provider_id: providerData.id,
      month: 2, // Adjusts to don't use the JS month pattern
      year: 2021,
    });

    expect(monthAvailability).toEqual(
      expect.arrayContaining([
        { day: 1, availability: false },
        { day: 2, availability: true },
        { day: 3, availability: true },
      ]),
    );
  });
});
