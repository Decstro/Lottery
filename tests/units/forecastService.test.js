const {ForecastService} = require('../../src/App/Services/forecastServices');

const Knex = require('knex');
const knexConfig = require('../../knexfile');

const { Model } = require('objection');

const knex = Knex(knexConfig.global);
Model.knex(knex);

 

describe('Testing ForeCast Service', () => {
  const forecastService = new ForecastService();
  const initDate = "2021-01-02" 
  const lastDate = "2023-01-14"
  test('Get most probable numbers', async () => {
    const response = await forecastService.getMostProbableNumbers(2, initDate, lastDate, null, false);
    console.log(response);
    expect(response[0]).toEqual([1,2]);
    expect(response[1]).toEqual([9,8]);
    expect(response[2]).toEqual([20,25]);
    expect(response[3]).toEqual([37,31]);
    expect(response[4]).toEqual([43,42]);
    expect(response[5]).toEqual([13,11]);
  });
  
  test('Get winning', async () => {
    const response = await forecastService.getWinningCombinations(2, initDate, lastDate, null, false);
    console.log(response)
  });
});













