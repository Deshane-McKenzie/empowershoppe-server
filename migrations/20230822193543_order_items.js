/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Order_Items', table => {
        table.increments('order_item_id').primary();
        table.integer('order_id').unsigned();
        table.integer('product_id').unsigned();
        table.integer('quantity').unsigned();
        
        table.foreign('order_id').references('Orders.order_id');
        table.foreign('product_id').references('Products.product_id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Order_Items');
};
