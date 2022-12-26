exports.seed = function(knex) {
  return knex('lotteries').del()
    .then( function () {
      return knex('lotteries').insert([
        {
          id: 1,
          ballot_one: 2,
          ballot_two: 8,
          ballot_three: 21,
          ballot_four: 38,
          ballot_five: 43,
          ballot_super: 7,
          is_rematch: true,
          week_day: 'Saturday',
          date: '2022-01-01'
        },
        {
          id: 2,
          ballot_one: 17,
          ballot_two: 19,
          ballot_three: 20,
          ballot_four: 21,
          ballot_five: 26,
          ballot_super: 13,
          is_rematch: false,
          week_day: 'Saturday',
          date: '2022-01-01'
        },
      ]);
    });
};    
