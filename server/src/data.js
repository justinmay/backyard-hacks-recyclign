import csv from "csv-parser"
import fs from "fs";

export function getData() {
    let ret = {}
    fs.createReadStream('data/productData.csv')
    .pipe(csv())
    .on('data', (row) => {
        // finding the tags of the data
        let tags = row["tag"].split(",")
        let product = {
            name: row['product'],
            description: row['description'],
            price: +row['price'],
            recycled_percent: row['% recycled'],
            link: row['link'],
            image_link: row['image link']
        }
        // putting the tag in the data 
        tags.forEach(tag => {
            tag = tag.trim(); 
            if( !(tag in ret)) {
                ret[tag] = [];
            } 
            ret[tag].push(product);
        });
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
    });
    return ret
}