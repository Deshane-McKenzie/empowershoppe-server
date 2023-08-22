/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Products', table => {
        table.increments('product_id').primary();
        table.string('title').notNullable();
        table.text('description').notNullable();
        table.string('product_image');
        table.decimal('price', 10, 2).notNullable();
        table.tinyint('star_rating');
        table.integer('quantity');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Products');
};
