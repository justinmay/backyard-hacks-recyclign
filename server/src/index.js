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
        const product_description_re = /(?<=class="field field-name-title-field field-type-text field-label-hidden")((.|\n)*?)(?=<\/h2>)/g;
        const name_re = /(?<=">)((.|\n)*?)(?=<\/)/g;
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
            //console.log(response); //got a response ! TODO: parse the response and respond to the user 
            const product_description = response.data.match(product_description_re);
            product_description.forEach(e => {
                console.log(e);
                e = e.match(name_re)[0].split("|");
                const name = e[0].trim();
                const description = e.length > 1 ? e[1].trim() : "";
                console.log("### ", name, description);
            });
        });
    }
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});