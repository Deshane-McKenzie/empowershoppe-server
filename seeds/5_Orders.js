/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Orders').del()
  await knex('Orders').insert([
    {
      order_id: 1,
      user_id: 1,
      order_date: "2023-09-08",
      payment_method: 'credit_card',
      shipping_method: 'standard',
      billing_address_id: 1,
      shipping_address_id: 2,
      total_amount: 20.00,
      order_status: 0,
    },
    {
      order_id: 2,
      user_id: 3,
      order_date: "2023-09-10",
      payment_method: 'credit_card',
      shipping_method: 'standard',
      billing_address_id: 3,
      shipping_address_id: 4,
      total_amount: 20.00,
      order_status: 0,
    }
  ]);
};
