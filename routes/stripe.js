const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));


router.post('/payment', async (req, res) => {
    const {
        billingName,
        billingAddress,
        shippingName,
        shippingAddress,
        token,
        product_id,
        quantity,
        total_amount,
        order_date, // Adding order_date in (YYYY-MM-DD format)

    } = req.body;

    try {
        const charge = await stripe.charges.create({
            amount: total_amount,
            currency: 'cad',
            source: token,
            description: 'EmpowerShoppe transaction',
        });

        if (charge.status === 'succeeded') { // Check if charge is successful
            // Insert or retrieve user_id based on billingName
            const [existingUser] = await knex('Users').select('user_id').where({
                first_name: billingName.first_name,
                last_name: billingName.last_name,
            });

            const user_id = existingUser ? existingUser.user_id : await knex('Users').insert({
                first_name: billingName.first_name,
                last_name: billingName.last_name,
                email: billingName.email,
                phone_number: billingName.phone_number,
            });

            // Check if shippingName is different from billingName
            if (shippingName.first_name !== billingName.first_name || shippingName.last_name !== billingName.last_name) {
                // Insert shipping user information into the Users table (if different)
                await knex('Users').insert({
                    user_id: user_id,
                    first_name: shippingName.first_name,
                    last_name: shippingName.last_name,
                    email: shippingName.email,
                    phone_number: shippingName.phone_number,
                });
            }

            // Insert billing and shipping addresses
            const billingId = await knex('Addresses').insert({
                user_id: user_id,
                address_type: 'billing',
                street: billingAddress.street,
                suite: billingAddress.suite,
                city: billingAddress.city,
                province: billingAddress.province,
                country: billingAddress.country,
                postal_code: billingAddress.postal_code,
            });

            const shippingId = await knex('Addresses').insert({
                user_id: user_id,
                address_type: 'shipping',
                street: shippingAddress.street,
                suite: shippingAddress.suite,
                city: shippingAddress.city,
                province: shippingAddress.province,
                country: shippingAddress.country,
                postal_code: shippingAddress.postal_code,
            });

            // Insert order and order items
            const orderId = await knex('Orders').insert({
                user_id: user_id,
                order_date: order_date,
                payment_method: 'credit_card',
                shipping_method: 'standard',
                billing_address_id: billingId[0],
                shipping_address_id: shippingId[0],
                total_amount: total_amount,
            });

            const orderItemId = await knex('Order_Items').insert({
                order_id: orderId[0],
                product_id: product_id,
                quantity: quantity,
            });

            res.status(200).json({ message: 'Payment successful' });
        } else {
            res.status(400).json({ message: 'Payment not successful' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Payment failed' });
    }
});


module.exports = router;