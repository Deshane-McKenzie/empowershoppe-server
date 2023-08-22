/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Addresses', table => {
        table.increments('address_id').primary();
        table.integer('user_id').unsigned();
        table.enum('address_type', ['billing', 'shipping']);
        table.string('street').notNullable();
        table.string('suite').notNullable();
        table.string('city').notNullable();
        table.string('province').notNullable();
        table.string('postal_code').notNullable();
        table.string('country').notNullable();
        
        table.foreign('user_id').references('Users.user_id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Addresses');
};
