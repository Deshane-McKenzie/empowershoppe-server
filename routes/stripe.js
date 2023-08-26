const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();


// router.post('/payment', (req, res) => {
//     const { amount, currency } = req.body;

//     // Create a payment session
//     stripe.checkout.sessions.create(
//         {
//             payment_method_types: ['card'],
//             line_items: [
//                 {
//                     price_data: {
//                         currency,
//                         product_data: {
//                             name: 'Your Product',
//                         },
//                         unit_amount: amount,
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: 'payment',
//             success_url: 'http://your-website.com/success',
//             cancel_url: 'http://your-website.com/cancel',
//         },
//         (err, session) => {
//             if (err) {
//                 res.status(500).json({ error: 'An error occurred.' });
//             } else {
//                 res.status(200).json({ sessionId: session.id });
//             }
//         }
//     );
// });


// router.post('/create-payment-session', (req, res) => {
//     const { billingDetails, shippingDetails, cartItems, totalAmount } = req.body;

//     // Create a payment session
//     stripe.checkout.sessions.create({
//         payment_method_types: ['card'],
//         line_items: [
//             /* Format your line items based on cartItems */
//         ],
//         /* Set success and cancel URLs */
//     })
//     .then(session => {
//         res.json({ sessionId: session.id });
//     })
//     .catch(error => {
//         console.error('Error creating payment session:', error);
//         res.status(500).json({ error: 'An error occurred.' });
//     });
// });

router.post("/payment", async (req, res) => {
    let {amount, id} = req.body
    try {
        const payment = await Stripe.PaymentIntentsResource.create({
            amount,
            currency: "CAD",
            description: "EmpowerShoppe",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment)
        res.json({
            message: "Payment Successful!",
            success: true
        })
    } catch (error) {
        console.log("Error", error)
        res.json({
            message: "Payment Unsuccessful",
            success: false
        })
    }
})

// // Set up webhook endpoint to handle payment confirmation event
// router.post('/webhook', (req, res) => {
//     const event = req.body;

//     // Handle the webhook event (e.g., update database)
//     // Make sure to handle different types of events (payment.success, etc.)

//     res.status(200).end();
// });


module.exports = router;