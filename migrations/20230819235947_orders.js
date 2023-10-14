/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.dropTableIfExists('Orders')
        .then(() => {
    return knex.schema.createTable('Orders', table => {
        table.increments('order_id').primary();
        table.integer('user_id').unsigned().references('user_id').inTable('Users');
        table.date('order_date').notNullable();
        table.string('payment_method').notNullable();
        table.string('shipping_method');
        table.integer('billing_address_id').unsigned().references('address_id').inTable('Addresses');
        table.integer('shipping_address_id').unsigned().references('address_id').inTable('Addresses');
        table.decimal('total_amount', 10, 2);
        table.integer('order_status').unsigned();
    });
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Orders')
}
