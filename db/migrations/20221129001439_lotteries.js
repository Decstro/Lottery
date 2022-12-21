/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export function up(knex) {
  return knex.schema.createTable('lotteries', table => {
    table.bigIncrements('id').notNullable().primary();
    table.integer('ballot_one').notNullable();
    table.integer('ballot_two').notNullable();
    table.integer('ballot_three').notNullable();
    table.integer('ballot_four').notNullable();
    table.integer('ballot_five').notNullable();
    table.integer('ballot_super').notNullable();
    table.boolean('is_rematch').notNullable();
    table.string('week_day').notNullable();
    table.date('date');
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('lotteries');
};
