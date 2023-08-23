const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));



// Allows for a set of reviews depending on the product to be retrieved so it can be shown in the webpage - Get Request
router.get('/', (req, res) => {
    const productId = req.params.product_id

    knex
        .select('review_id', 'product_id', 'user_id', 'review_text', 'star_rating', 'review_date',)
        .from('Reviews')
        .where({ product_id: productId })
        .then((data) => {
            if (!data.length) {
                return res.status(404).json({ message: "Review id's not found!" });
            }
            res.status(200).json(data);

        })
        .catch((err) => {
            res.status(500).send(`Error getting reviews with id:${reviewsId}`)
        });
});


// Allows for a single review to be retrieved/selected for the purposes of editing/deleting - Get Request
router.get('/:id', (req, res) => {
    const reviewsId = req.params.id

    knex
        .select('review_id', 'product_id', 'user_id', 'review_text', 'star_rating', 'review_date',)
        .from('Reviews')
        .where({ review_id: reviewsId })
        .then((data) => {
            if (!data.length) {
                return res.status(404).json({ message: "Review id not found!" });
            }
            res.status(200).json(data);

        })
        .catch((err) => {
            res.status(500).send(`Error getting reviews with id:${reviewsId}`)
        });
});


// Allows User to post a review on the website while updating the database - Post Request
router.post('/', (req, res) => {
    const productId = req.params.product_id
    const { 
        first_name,
        last_name,
        review_text,
        star_rating,
    } = req.body;

    knex('Users')
        .insert({ first_name, last_name })
        .returning('user_id')
        .then(([user_id]) => {
            // Insert review data into Reviews table
            return knex('Reviews')
                .insert({
                    user_id, // Automatically generated user_id from the Users table
                    product_id: productId, // product_id from the route to match the review with the product in the database
                    review_text,
                    star_rating,
                });
        })
        .then(() => {
            const newReview = {
                review_text,
                star_rating,
                review_date: new Date().toISOString().split('T')[0]
            };
    
            return res.status(201).json(newReview);
        })
        .catch((err) => {
            res.status(500).send(`Error adding review: ${err}`);
        });
});


// Allows for edits to be made to a review in the database and on the website. -Put Request
router.put('/:id', (req, res) => {
    const reviewId = req.params.id;
    const { 
        first_name,
        last_name,
        review_text,
        star_rating,
    } = req.body;

    knex('Reviews')
        .where({ review_id: reviewId })
        .update({
        review_text,
        star_rating,
    })
    .then(() => {
        // Retrieve the user_id associated with the review
        return knex('Reviews')
            .select('user_id')
            .where({ review_id: reviewId })
            .first();
    })
    .then(userIdResult => {
        if (userIdResult) {
            // Update user data in Users table
            return knex('Users')
                .where({ user_id: userIdResult.user_id })
                .update({
                    first_name,
                    last_name,
                });
        } else {
            throw new Error('Review not found');
        }
    })
    .then(() => {
        const updatedReview = {
            id: reviewId,
            review_text,
            star_rating,
            review_date: new Date().toISOString().split('T')[0]
        };
   
        return res.status(200).json(updatedReview);
    })
    .catch((err) => {
        res.status(500).send(`Error editing Review ID: ${reviewId}! ${err}`);
    });
});


// Allows for a review to be deleted from the database and the webpage.
router.delete('/:id', (req, res) => {
    const reviewId = req.params.id;

    knex('reviews')
        .where({ review_id: reviewId })
        .del()
        .then(() => {
            res.status(200).json({ message: `Review with id: ${reviewId} has been deleted!` });
        })
        .catch((err) => {
            res.status(500).send(`Error deleting Review ${reviewId} ${err}!`);
        });
})


module.exports = router;