/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Reviews', table => {
        table.increments('review_id').primary();
        table.integer('product_id').unsigned().references('product_id').inTable('Products');
        table.integer('user_id').unsigned().references('user_id').inTable('Users');
        table.text('review_text');
        table.tinyint('star_rating').unsigned();
        table.date('review_date');
        table.text('first_name');
        table.text('last_name');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Reviews');
};
