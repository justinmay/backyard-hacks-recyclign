import express from "express";
import {getData} from './data';
import axios from "axios";

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
        // search ecopromotionsonline website
        const search_url = `https://www.ecopromotionsonline.com/products?search_api_views_fulltext=${stemmed_name}&field_category=All&items_per_page=24`;
        // GET request for remote image in node.js
        
        axios({
            method: 'get',
            url: 'https://www.ecopromotionsonline.com/products',
            data:{
                params:{
                    search_api_views_fulltext:stemmed_name,
                    field_category:"All",
                    items_per_page:24
                }
            },
        }).then(function (response) {
            console.log(response); //got a response ! TODO: parse the response and respond to the user 
        });
    }
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});