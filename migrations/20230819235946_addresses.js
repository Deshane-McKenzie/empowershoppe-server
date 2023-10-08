/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Addresses', table => {
        table.increments('address_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('Users');
        table.enum('address_type', ['billing', 'shipping']);
        table.string('street').notNullable();
        table.string('suite').notNullable();
        table.string('city').notNullable();
        table.string('province').notNullable();
        table.string('postal_code').notNullable();
        table.string('country').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Addresses');
};
