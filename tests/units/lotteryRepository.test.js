const {LotteryRepository} = require('../../src/App/Repositories/Database/lottery');
const Knex = require('knex');
const knexConfig = require('../../knexfile');

const { Model } = require('objection');

const knex = Knex(knexConfig.global);
Model.knex(knex);

describe('Testing Repository Lottery', () => {
  const lotteryRepository = new LotteryRepository();
  test('Get the lottery records quantity', async () => {
    const response = await lotteryRepository.recordsQuantity;
    expect(response).toBe(208);
  });
  test('Get the number absolute frecuency', async () => {
    const response = await lotteryRepository.getNumberAbsoluteFrecuency(20,1,"2022-12-20", "2022-12-24");
    expect(response).toBe(5);
  });
  test('Get All Modes of a specific ballot', async () => {
    const response = await lotteryRepository.getAllBallotModes(3, 3, "2022-01-01", "2022-03-30");
    expect(response).toEqual([24, 36, 33]);
  });
  test('Get Modes of a specific ballot by WeekDay', async () => {
    const response = await lotteryRepository.getBallotModesByWeekDay(3, 3, "2022-01-01", "2022-03-30", "Saturday");
    expect(response).toEqual([33, 27, 20]);
  });
  test('Get Modes of a specific ballot by Rematch', async () => {
    const response = await lotteryRepository.getBallotModesByRematch(3, 3, "2022-01-01", "2022-03-30", true);
    expect(response).toEqual([9, 33, 31]);
  });
  test('Get Modes of a specific ballot by Day And Rematch', async () => {
    const response = await lotteryRepository.getBallotModesByDayAndRematch(3, 3, "2022-01-01", "2022-03-30","Wednesday", false);
    expect(response).toEqual([9, 38, 34]);
  });

});