import express from "express";
import {getData} from './data';
import axios from "axios";
import stemmer from 'stemmer';

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
    const raw_name = req.query.productName.trim();
    const keyword = req.query.keyword ? req.query.keyword.trim() : raw_name;
    console.log(" --- NEW GET REQUEST --- ")
    console.log("keyword: ", keyword);
    console.log("searching for: ", raw_name);
    // stem the name
    let stemmed_names = raw_name.split(" ");
    console.log(" stemmed names before: ", stemmed_names)
    stemmed_names = stemmed_names.map(e => {
        return stemmer(e.trim());
    });
    console.log(" stemmed names: ", stemmed_names)
    let found = false;
    for(const index in stemmed_names) {
        const stemmed_name = stemmed_names[index];
        console.log("searching for ", stemmed_name)
        if (stemmed_name in product_data) {
            // return object
            console.log("Found in Database with product: ", stemmed_name)
            const response_data = {products: product_data[stemmed_name]}
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json(response_data);
            found = true;
            break;
        }
    }

    // check for hit in local data 
    if (!found) {
        console.log("Not found in database, searching ecopromos for: ", keyword)
        // search ecopromotionsonline website
        const search_url = `https://www.ecopromotionsonline.com/products?search_api_views_fulltext=${keyword}&field_category=All&items_per_page=24`;
        // GET request for remote image in node.js
        const product_description_re = /(?<=class="field field-name-title-field field-type-text field-label-hidden")((.|\n)*?)(?=<\/h2>)/g;
        const name_re = /(?<=">)((.|\n)*?)(?=<\/)/g;
        const price_re = /(?<=span> \$)((.|\n)*?)(?=<\/div>)/g;
        const image_link_re = /<img[^>]+src="([^">]+)"[^>]width="270" height="305/g;
        axios({
            method: 'get',
            url: 'https://www.ecopromotionsonline.com/products',
            params:{
                search_api_views_fulltext:keyword,
                field_category:"All",
                items_per_page:24
            },
        }).then(function (response) {
            console.log("Valid response from ecopromos");
            const product_description = response.data.match(product_description_re);
            const names = [];
            const descriptions = [];
            const product_links = [];
            product_description.forEach(e => {
                const product_link = "https://www.ecopromotionsonline.com" + e.split('"')[1]; 
                product_links.push(product_link);
                e = e.match(name_re)[0].split("|");
                const name = e[0].trim();
                const description = e.length > 1 ? e[1].trim() : "";
                
                names.push(name);
                descriptions.push(description);
            });
            const prices = response.data.match(price_re);
            let image_links = response.data.match(image_link_re);
            image_links = image_links.map(e=> {
                return e.split('"')[1]
            });

            const response_limit = 6;
            const ret = {products: []};
            for(let i = 0;i < response_limit; i++) {
                const product = {
                    name: names[i],
                    description: descriptions[i],
                    price: +prices[i],
                    recycled_percent: undefined,
                    link: product_links[i],
                    image_link: image_links[i]
                }
                ret["products"].push(product)
            }
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.status(200).json(ret);
        }).catch(e => {
            console.log("error: ",e);
        })
    }
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});