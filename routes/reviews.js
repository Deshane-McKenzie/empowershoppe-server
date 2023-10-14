const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../knexfile'));

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());


// List all reviews
router.get('/', (req, res) => {
    knex
        .select('review_id', 'product_id', 'first_name', 'last_name', 'user_id', 'review_text', 'star_rating', 'review_date')
        .from('Reviews')
        .then((reviewData) => {
            res.status(200).json(reviewData);
        })
        .catch((err) => {
            res.status(500).send(`Error getting reviews: ${err}`);
        });
});


// Post a review
router.post('/', (req, res) => {
    const {
      product_id,
      first_name,
      last_name,
      review_text,
      star_rating,
      review_date,
    } = req.body;
  
    knex('Reviews')
      .insert({
        product_id,
        first_name,
        last_name,
        review_text,
        star_rating,
        review_date,
      })
      .then(() => {
        console.log('Review added');
        res.status(201).json({ message: 'Review submitted successfully' });
      })
      .catch((err) => {
        console.error('Error adding review:', err);
        res.status(500).json({ error: 'Failed to add review' });
      });
  });


// Edit a review
router.put('/:review_id', (req, res) => {
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
router.delete('/:review_id', (req, res) => {
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


// View a single review by review ID
router.get('/:review_id', (req, res) => {
    const reviewId = req.params.review_id;

    knex
        .select('review_id', 'product_id', 'user_id', 'first_name', 'last_name', 'review_text', 'star_rating', 'review_date')
        .from('Reviews')
        .where({ review_id: reviewId })
        .then((reviewData) => {
            if (!reviewData.length) {
                return res.status(404).json({ message: "Review id not found!" });
            }
            res.status(200).json(reviewData[0]);
        })
        .catch((err) => {
            res.status(500).send(`Error getting review with id:${reviewId}`);
        });
});


module.exports = router;