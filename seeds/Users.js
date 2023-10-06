/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {
      user_id: 1,
      first_name: "Sarah",
      last_name: "Kim",
      email: null,
      password: null,
      phone_number: "416-534-2243"
    },
    {
      user_id: 2,
      first_name: "Robyn",
      last_name: "Jacobs",
      email: null,
      password: null,
      phone_number: "647-555-5595"
    },
    {
      user_id: 3,
      first_name: "Freddie",
      last_name: "Taylor",
      email: null,
      password: null,
      phone_number: "905-444-4484"
    },
    {
      user_id: 4,
      first_name: "Nicola",
      last_name: "Lucero",
      email: null,
      password: null,
      phone_number: "444-454-4489"
    },
    {
      user_id: 5,
      first_name: "Levi",
      last_name: "Walter",
      email: null,
      password: null,
      phone_number: "905-555-5555"
    },
    {
      user_id: 6,
      first_name: "Ines",
      last_name: "Lopez",
      email: null,
      password: null,
      phone_number: "416-444-4416"
    },
    {
      user_id: 7,
      first_name: "Macy",
      last_name: "Cabrera",
      email: null,
      password: null,
      phone_number: "289-999-9989"
    },
    {
      user_id: 8,
      first_name: "Felix",
      last_name: "Mendez",
      email: null,
      password: null,
      phone_number: "340-333-3334"
    },
    {
      user_id: 9,
      first_name: "Jerome",
      last_name: "Finley",
      email: null,
      password: null,
      phone_number: "223-888-8823"
    },
    {
      user_id: 10,
      first_name: "Tommy-Lee",
      last_name: "Harris",
      email: null,
      password: null,
      phone_number: "213-213-2213"
    },
    {
      user_id: 11,
      first_name: "Aadam",
      last_name: "King",
      email: null,
      password: null,
      phone_number: "546-554-5466"
    },
    {
      user_id: 12,
      first_name: "Kaya",
      last_name: "Terry",
      email: null,
      password: null,
      phone_number: "416-111-1111"
    },
    {
      user_id: 13,
      first_name: "Chad",
      last_name: "Rollins",
      email: null,
      password: null,
      phone_number: "289-222-2119"
    },
    {
      user_id: 14,
      first_name: "Tanya",
      last_name: "Beasley",
      email: null,
      password: null,
      phone_number: "789-777-7777"
    },
    {
      user_id: 15,
      first_name: "Ellis",
      last_name: "Joyce",
      email: null,
      password: null,
      phone_number: "567-555-5555"
    },
    {
      user_id: 16,
      first_name: "Francis",
      last_name: "Webster",
      email: null,
      password: null,
      phone_number: "123-111-1111"
    },
    {
      user_id: 17,
      first_name: "Liberty",
      last_name: "Sanford",
      email: null,
      password: null,
      phone_number: "222-223-2234"
    },
    {
      user_id: 18,
      first_name: "Jaden",
      last_name: "Kemp",
      email: null,
      password: null,
      phone_number: "345-333-3333"
    },
  ]);
};
