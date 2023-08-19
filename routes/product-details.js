const express = require('express');
const router = express.Router();
const fs = require('fs');

//Allows for information from the api/product-details.json file to be posted on the webpage

router.get("/", (req, res)=>{
    fs.readFile('./data/product-details.json', 'utf8', (err, data)=>{
        if(err) {
            console.log(err);
            res.send('error reading products!')
        }
        res.json(JSON.parse(data));
    })
    
});

//Both router.get , reads through the product-details.json file to verify contents and runs the code/calls function

router.get("/:id", (req, res)=>{
    fs.readFile('./data/product-details.json', 'utf8', (err, data)=>{
        if(err) {
            console.log(err);
            return res.send('error reading product with ID:' + req.params.id)
        }
        const products = JSON.parse(data);
        const activeProduct = products.find((product)=> product.id == req.params.id);
        // Allows for only the information regarding the specific ID to populate ^^^vvv
        res.json(activeProduct);
    })
    
});

module.exports = router;