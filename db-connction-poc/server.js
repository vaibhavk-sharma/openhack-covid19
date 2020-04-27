
var express = require('express');
var bodyParser = require('body-parser');

const cloudantService = require('./db-utility.js');

// Create express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// urls
app.get('/', (req, res)=>{
    cloudantService.getDbs();
    res.json('This is nodejs api');
})

app.listen('3000', ()=>{
    console.log('app is listening on port 3000')
})
