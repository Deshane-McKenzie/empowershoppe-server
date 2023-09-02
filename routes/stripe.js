const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));


router.get('/payment/success', (req, res) => {
    const {
        billing_id,
        shipping_id,
        order_id,
        order_item_id
    } = req.query;

    knex('Orders')
        .where({ order_id: order_id })
        .update({ order_status: 1 })
        .then(() => {
            res.redirect(302, `http://localhost:3000/thankyou?payment=success&orderid=${order_id}`);
        })
        .catch((err) => {
            res.status(500).send(`Error updating order status with id:${order_id}`);
        });
});


// Calulates total amount in cart
function calculateTotalAmount(cartItems) {
    let totalAmount = 0;
  
    for (const item of cartItems) {
      totalAmount += item.price * item.quantity;
    }
  
    return totalAmount;
  }


// Post payment
router.post('/payment', (req, res) => {
    const {
        billing,
        shipping,
        payment,
        cart,
        token,
        product_id,
        quantity,
        order_date,
    } = req.body;
    const cartItems = req.body.cart.cartItems;
    const total_amount = calculateTotalAmount(cartItems);

    let user_id;

    // Inserts or retrieves user_id based on billingName
    knex('Users')
        .select('user_id')
        .where({ email: billing.email })
        .then((existingUser) => {
            if (existingUser.length > 0) {
                // If the user already exists, use their user_id
                user_id = existingUser[0].user_id;
            } else {
                // If the user doesn't exist, insert a new user and get their user_id
                return knex('Users')
                    .insert({
                        first_name: billing.firstName,
                        last_name: billing.lastName,
                        email: billing.email,
                        phone_number: billing.phonenumber,
                    });
            }
        })
        .then(() => {
            // Checks if shippingName is different from billingName
            if (shipping.firstName !== billing.firstName || shipping.lastName !== billing.lastName) {
                // Inserts shipping user information into the Users table (if different)
                return knex('Users')
                    .insert({
                        user_id: user_id,
                        first_name: shipping.firstName,
                        last_name: shipping.lastName,
                        email: shipping.email,
                        phone_number: shipping.phonenumber,
                    });
            }
        })
        .then(() => {
            // Inserts billing and shipping addresses
            return knex('Addresses').insert({
                user_id: user_id,
                address_type: 'billing',
                street: billing.street,
                suite: billing.suite,
                city: billing.city,
                province: billing.province,
                country: billing.country,
                postal_code: billing.postalcode,
            });
        })
        .then((billingId) => {
            return knex('Addresses').insert({
                user_id: user_id,
                address_type: 'shipping',
                street: shipping.street,
                suite: shipping.suite,
                city: shipping.city,
                province: shipping.province,
                country: shipping.country,
                postal_code: shipping.postalcode,
            })
            .then((shippingId) => {
                // Inserts order and order items
                return knex('Orders').insert({
                    user_id: user_id,
                    order_date: order_date,
                    payment_method: 'credit_card',
                    shipping_method: 'standard',
                    billing_address_id: billingId[0],
                    shipping_address_id: shippingId[0],
                    total_amount: total_amount,
                    order_status: 0,
                });
            });
        })
        .then((orderId) => {
            // Inserts order items (multiple items at the same time)
            const orderItemPromises = cartItems.map((item) => {
                return knex('Order_Items').insert({
                    order_id: orderId[0],
                    product_id: item.product_id,
                    quantity: item.quantity,
                });
            });

            return Promise.all(orderItemPromises);
        })
        .then(() => {
            // Creates a Stripe session and sends the checkout URI
            return stripe.checkout.sessions.create({
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: 'EmpowerShopee products',
                                description: 'EmpowerShopee Products',
                            },
                            unit_amount_decimal: parseFloat(total_amount) * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',
                success_url: `http://localhost:8000/api/payment/success?billing_id=${billingId}&shipping_id=${shippingId}&order_id=${orderId}&order_item_id=${orderItemId}`,
            });
        })
        .then((session) => {
            // Redirects to Stripe checkout
            console.log(session.url);
            res.status(200).json({ checkoutURI: session.url });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ message: 'Payment failed' });
        });
});


module.exports = router;