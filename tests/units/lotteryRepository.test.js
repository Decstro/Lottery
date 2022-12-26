const {LotteryRepository} = require('../../src/App/Repositories/Database/lottery');
const Knex = require('knex');
const knexConfig = require('../../knexfile');

const { Model } = require('objection');

const knex = Knex(knexConfig.global);
Model.knex(knex);

describe('Test Function IsValid', () => {
  const lotteryRepository = new LotteryRepository();
  test('Get the lottery records quantity', async () => {
    const response = await lotteryRepository.recordsQuantity;
    expect(response).toBe(208);
  });
  test('Get the number absolute frecuency', async () => {
    const response = await lotteryRepository.getNumberAbsoluteFrecuency(20,1);
    expect(response).toBe(5);
  });
  test('Get the Mode of a specific ballot', async () => {
    const response = await lotteryRepository.getBallotModes(3, 3);
    expect(response).toBe([27, 15, 33]);
  });
});