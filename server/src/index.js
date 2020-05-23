import express from "express";

var app = express();

var PORT = 3000;

app.get('/product', function(req, res) {
    const raw_name = req.query.productName;
    console.log(raw_name);
    res.status(200).send('Hello world');
});

app.listen(PORT, function() {
    console.log('Server is running on PORT:',PORT);
});