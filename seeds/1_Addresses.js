/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Order_Items').del()
  await knex('Orders').del()
  await knex('Addresses').del()
  await knex('Addresses').insert([
    {
      address_id: 1,
      user_id: null,
      address_type: 'billing',
      street: '123 Front Street',
      suite: '',
      city: 'Toronto',
      province: 'Ontario',
      postal_code: 'M9C0A1',
      country: 'Canada',
    },
    {
      address_id: 2,
      user_id: null,
      address_type: 'shipping',
      street: '123 Front Street',
      suite: '',
      city: 'Toronto',
      province: 'Ontario',
      postal_code: 'M9C0A1',
      country: 'Canada',
    },
    {
      address_id: 3,
      user_id: null,
      address_type: 'billing',
      street: '321 Back Street',
      suite: '12',
      city: 'Toronto',
      province: 'Ontario',
      postal_code: 'M9C0A2',
      country: 'Canada',
    },
    {
      address_id: 4,
      user_id: null,
      address_type: 'shipping',
      street: '321 Back Street',
      suite: '12',
      city: 'Toronto',
      province: 'Ontario',
      postal_code: 'M9C0A2',
      country: 'Canada',
    }
  ]);
};
