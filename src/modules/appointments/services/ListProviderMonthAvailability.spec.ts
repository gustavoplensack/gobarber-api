import MockDate from 'mockdate';

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
    // NOTE: Day 1 should be false because is a past date
    MockDate.set('2021-02-02T06:00:00.000Z');

    const providerData = {
      id: '123456',
    };

    const customerData = {
      id: '111111',
    };

    // Take all from day 2
    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 9, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 10, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 11, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 12, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 13, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 14, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 15, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 16, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 2, 17, 0, 0),
    });

    // Take one from day 3
    await fakeAppointmentsRepository.create({
      provider_id: providerData.id,
      customer_id: customerData.id,
      date: new Date(2021, 1, 3, 13, 0, 0),
    });

    const monthAvailability = await listProviderMonthAvailability.execute({
      provider_id: providerData.id,
      month: 2, // Adjusts to don't use the JS month pattern
      year: 2021,
    });

    expect(monthAvailability).toEqual(
      expect.arrayContaining([
        { day: 1, availability: false },
        { day: 2, availability: false },
        { day: 3, availability: true },
        { day: 4, availability: true },
      ]),
    );
  });
});
