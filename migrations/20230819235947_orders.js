/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Orders', table => {
        table.increments('order_id').primary();
        table.integer('user_id').unsigned();
        table.date('order_date').notNullable();
        table.string('payment_method').notNullable();
        table.string('shipping_method');
        table.integer('billing_address_id').unsigned();
        table.integer('shipping_address_id').unsigned();
        table.decimal('total_amount', 10, 2);
        
        table.foreign('user_id').references('Users.user_id');
        table.foreign('billing_address_id').references('Addresses.address_id');
        table.foreign('shipping_address_id').references('Addresses.address_id');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Orders');
};
