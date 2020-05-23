import express from "express";
import {getData} from './data';

/**
 * importing the data
 */

 let product_data = getData();

/**
 * Setting up the server
 */

var app = express();

var PORT = 3000;

app.get('/product', function(req, res) {
    const raw_name = req.query.productName;
    console.log(raw_name);

    // stem the name
    const stemmed_name = raw_name;

    // check for hit in local data 
    if (stemmed_name in product_data) {
        // return object
        const response_data = {products: product_data[stemmed_name]}
        res.status(200).json(response_data)
    } else {
        // search krishna's website
    }
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});