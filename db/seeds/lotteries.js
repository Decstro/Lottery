/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('lotteries').del()
  await knex('lotteries').insert([
    {
      id: 1,
      ballot_one: 12,
      ballot_two: 9,
      ballot_three: 23,
      ballot_four: 43,
      ballot_five: 5,
      ballot_super: 8,
      is_rematch: false,
      week_day: 'Wednesday',
      date: '2022-12-25'
    },
  ]);
}
