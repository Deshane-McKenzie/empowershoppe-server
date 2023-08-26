const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));



// Allows for All information from the Products database to be pulled so it can show on the webpage - GET Request
router.get('/', (_req, res) => {
    knex
        .select('product_id', 'title', 'description', 'product_image', 'price', 'star_rating',
            'quantity')
        .from('Products')
        .orderBy([
            { column: 'product_id', order: 'asc' }
        ])
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).send("Error retrieving Products!");
        });
});


// GET product details along with its reviews
router.get('/:product_id', (req, res) => {
    const productId = req.params.product_id;

    knex
        .select('product_id', 'title', 'description', 'product_image', 'price', 'star_rating', 'quantity')
        .from('Products')
        .where({ product_id: productId })
        .then((productData) => {
            if (!productData.length) {
                return res.status(404).json({ message: "Product id not found!" });
            }

            knex
                .select('review_id', 'user_id', 'review_text', 'star_rating', 'review_date')
                .from('Reviews')
                .where({ product_id: productId })
                .then((reviewData) => {
                    const responseData = {
                        product: productData[0], // Assuming product_id is unique
                        reviews: reviewData
                    };
                    res.status(200).json(responseData);
                })
                .catch((err) => {
                    res.status(500).send(`Error getting reviews for product with id:${productId}`);
                });
        })
        .catch((err) => {
            res.status(500).send(`Error getting product with id:${productId}`);
        });
});


// Edit a review
router.put('/reviews/:review_id', (req, res) => {
    const reviewId = req.params.review_id;
    const { review_text, star_rating } = req.body;

    knex('Reviews')
        .where({ review_id: reviewId })
        .update({ review_text, star_rating })
        .then(() => {
            res.status(200).json({ message: "Review updated successfully!" });
        })
        .catch((err) => {
            res.status(500).send(`Error updating review with id:${reviewId}`);
        });
});


// Delete a review
router.delete('/reviews/:review_id', (req, res) => {
    const reviewId = req.params.review_id;

    knex('Reviews')
        .where({ review_id: reviewId })
        .del()
        .then(() => {
            res.status(200).json({ message: "Review deleted successfully!" });
        })
        .catch((err) => {
            res.status(500).send(`Error deleting review with id:${reviewId}`);
        });
});


module.exports = router;