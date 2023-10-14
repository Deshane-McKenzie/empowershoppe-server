/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Order_Items').del()
  await knex('Order_Items').insert([
    {
      order_item_id: 1,
      order_id: 1,
      product_id: 2,
      quantity: 1,
    },
    {      
      order_item_id: 2,
      order_id: 2,
      product_id: 2,
      quantity: 1,
    },
    {
      order_item_id: 3,
      order_id: 1,
      product_id: 3,
      quantity: 1,
    },
    {
      order_item_id: 4,
      order_id: 1,
      product_id: 4,
      quantity: 1,
    }
  ]);
};
