/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Order_Items', table => {
        table.increments('order_item_id').primary();
        table.integer('order_id').unsigned().references('order_id').inTable('Orders');
        table.integer('product_id').unsigned().references('product_id').inTable('Products');
        table.integer('quantity').unsigned();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Order_Items');
};
