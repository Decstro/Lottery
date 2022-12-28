const {ForecastService} = require('../../src/App/Services/forecastServices');

const Knex = require('knex');
const knexConfig = require('../../knexfile');

const { Model } = require('objection');

const knex = Knex(knexConfig.global);
Model.knex(knex);

describe('Testing Repository Lottery', () => {
  const forecastService = new ForecastService();
  test('Get the lottery records quantity', async () => {
    const response = await forecastService.getWinningCombination(5, "2022-01-01", '2022-04-30', "Wednesday", true)
    console.log(
      'Ballot One: '+response[0],
      'Ballot Two: '+response[1],
      'Ballot Three: '+response[2],
      'Ballot Four: '+response[3],
      'Ballot Five: '+response[4],
      'Ballot Super: '+response[5], 
    );
  });    
});













