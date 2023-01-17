const {ForecastService} = require('../../src/App/Services/forecastServices');

const Knex = require('knex');
const knexConfig = require('../../knexfile');

const { Model } = require('objection');

const knex = Knex(knexConfig.global);
Model.knex(knex);

describe('Testing ForeCast Service', () => {
  const forecastService = new ForecastService();
  test('Get most probable numbers', async () => {
    const response = await forecastService.getMostProbableNumbers(3, "2022-01-01", '2023-01-14', null, false);
    expect(response[0]).toEqual([1,3,2]);
    expect(response[1]).toEqual([9,8,14]);
    expect(response[2]).toEqual([30,28,27]);
    expect(response[3]).toEqual([31,37,38]);
    expect(response[4]).toEqual([43,42,40]);
    expect(response[5]).toEqual([1,14,11]);
  });    
});













