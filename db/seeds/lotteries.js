/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('lotteries').del()
  await knex('lotteries').insert([
    {id: 1, winning_combination: '123457', isRematch: false},
    {id: 2, winning_combination: '123757', isRematch: false},
    {id: 3, winning_combination: '233457', isRematch: true},
  ]);
};
