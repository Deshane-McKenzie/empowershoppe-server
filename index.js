const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const productRoute = require('./routes/products');
const activeProductRoute = require('./routes/products');

/*
* The port the server should listen to allow routing to work 
* will use the port in .env file (8000) otherwise if process.env.PORT is undefinted, use 8080
*/
const PORT = process.env.PORT || 8080;

/*
* middleware allows react app using a different port to connect to and communicate with this API server
* This allows for any port to communicate with this API server but there is an option to have only a specific port communicate with this API server
*/
app.use(cors());

// middleware used to have req.body work
app.use(express.json());

// middleware used to access public folder for images - allowing for load of route file
app.use(express.static('public'));

// middleware used to load route files x3
app.use('/product', productRoute);
app.use('/product/:id', activeProductRoute)

//listening for the port to use to start the server
app.listen(PORT, () => (
    console.log(`server running at http://localhost:${PORT}`)
));