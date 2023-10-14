/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Users').del()
  await knex('Users').insert([
    {
      user_id: 1,
      first_name: "Sarah",
      last_name: "Kim",
      email: "sarah.kim@example.com",
      password: "sarah.kim",
      phone_number: "416-534-2243"
    },
    {
      user_id: 2,
      first_name: "Robyn",
      last_name: "Jacobs",
      email: "robyn.jacobs@example.com",
      password: "robyn.jacobs",
      phone_number: "647-555-5595"
    },
    {
      user_id: 3,
      first_name: "Freddie",
      last_name: "Taylor",
      email: "freddie.taylor@example.com",
      password: "freddie.taylor",
      phone_number: "905-444-4484"
    },
    {
      user_id: 4,
      first_name: "Nicola",
      last_name: "Lucero",
      email: "nicola.lucero@example.com",
      password: "nicola.lucero",
      phone_number: "444-454-4489"
    },
    {
      user_id: 5,
      first_name: "Levi",
      last_name: "Walter",
      email: "levi.walter@example.com",
      password: "levi.walter",
      phone_number: "905-555-5555"
    },
    {
      user_id: 6,
      first_name: "Ines",
      last_name: "Lopez",
      email: "ines.lopez@example.com",
      password: "ines.lopez",
      phone_number: "416-444-4416"
    },
    {
      user_id: 7,
      first_name: "Macy",
      last_name: "Cabrera",
      email: "macy.cabrera@example.com",
      password: "macy.cabrera",
      phone_number: "289-999-9989"
    },
    {
      user_id: 8,
      first_name: "Felix",
      last_name: "Mendez",
      email: "felix.mendez@example.com",
      password: "felix.mendez",
      phone_number: "340-333-3334"
    },
    {
      user_id: 9,
      first_name: "Jerome",
      last_name: "Finley",
      email: "jerome.finley@example.com",
      password: "jerome.finley",
      phone_number: "223-888-8823"
    },
    {
      user_id: 10,
      first_name: "Tommy-Lee",
      last_name: "Harris",
      email: "tommylee.harris@example.com",
      password: "tommylee.harris",
      phone_number: "213-213-2213"
    },
    {
      user_id: 11,
      first_name: "Aadam",
      last_name: "King",
      email: "aadam.king@example.com",
      password: "aadam.king",
      phone_number: "546-554-5466"
    },
    {
      user_id: 12,
      first_name: "Kaya",
      last_name: "Terry",
      email: "kaya.terry@example.com",
      password: "kaya.terry",
      phone_number: "416-111-1111"
    },
    {
      user_id: 13,
      first_name: "Chad",
      last_name: "Rollins",
      email: "chad.rollins@example.com",
      password: "chad.rollins",
      phone_number: "289-222-2119"
    },
    {
      user_id: 14,
      first_name: "Tanya",
      last_name: "Beasley",
      email: "tanya.beasley@example.com",
      password: "tanya.beasley",
      phone_number: "789-777-7777"
    },
    {
      user_id: 15,
      first_name: "Ellis",
      last_name: "Joyce",
      email: "ellis.joyce@example.com",
      password: "ellis.joyce",
      phone_number: "567-555-5555"
    },
    {
      user_id: 16,
      first_name: "Francis",
      last_name: "Webster",
      email: "francis.webster@example.com",
      password: "francis.webster",
      phone_number: "123-111-1111"
    },
    {
      user_id: 17,
      first_name: "Liberty",
      last_name: "Sanford",
      email: "liberty.sanford@example.com",
      password: "liberty.sanford",
      phone_number: "222-223-2234"
    },
    {
      user_id: 18,
      first_name: "Jaden",
      last_name: "Kemp",
      email: "jaden.kemp@example.com",
      password: "jaden.kemp",
      phone_number: "345-333-3333"
    },
  ]);
};
