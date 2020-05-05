
var express = require('express');
var bodyParser = require('body-parser');

const cloudantService = require('./db-utility.js');
const port = process.env.PORT || 3000

// Create express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// urls
app.get('/', (req, res)=>{   
   
    let dbList = cloudantService.getDbs().then((data)=>
    {       
        res.json('This is nodejs api-Digitized Community and databases in IBM Cloudant are: ' + data.data);
    });
   // res.json('This is nodejs api-Digitized Community and databases are: ' + JSON.stringify(dbNames));
})

// app.listen('3000', ()=>{
//     console.log('app is listening on port 3000')
// })

const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Digitized Community node js app is listening at http://${host}:${port}`);
 });