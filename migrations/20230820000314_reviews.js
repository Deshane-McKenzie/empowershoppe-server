/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Reviews', table => {
        table.increments('review_id').primary();
        table.integer('product_id').unsigned();
        table.integer('user_id').unsigned();
        table.text('review_text');
        table.tinyint('star_rating').unsigned();
        table.date('review_date').toISOString().split('T')[0];
        table.text('first_name');
        table.text('last_name');
        
        table.foreign('product_id').references('Products.product_id');
        table.foreign('user_id').references('Users.user_id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Reviews');
};
