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

// Allows for 1 product from the Products database based on the id to be pulled from the Products database so it can show on the webpage - GET Request
router.get('/:product_id', (req, res) => {
    const productId = req.params.product_id

    knex
        .select('product_id', 'title', 'description', 'product_image', 'price', 'star_rating',
        'quantity')
        .from('Products')
        .where({ product_id: productId })
        .then((data) => {
            if (!data.length) {
                return res.status(404).json({ message: "Product id not found!" });
            }
            res.status(200).json(data);

        })
        .catch((err) => {
            res.status(500).send(`Error getting product with id:${productId}`)
        });
});


module.exports = router;