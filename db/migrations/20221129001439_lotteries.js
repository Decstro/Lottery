/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export function up(knex) {
  return knex.schema.createTable('lotteries', table => {
    table.specificType('id', 'char(3)').notNullable().primary();
    table.string('winning_combination').notNullable();
    table.boolean('isRematch').notNullable();
    table.timestamp('date');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('lotteries');
};
