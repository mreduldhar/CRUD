const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');
const path = require('path')

// Security Middleware

const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xss = require('xss-clean');
const cors = require('cors');


// Database lib import
const mongoose = require('mongoose');

// Security Middleware Implement

app.use(rateLimit());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(xss());
app.use(cors());

// Body-Parser
app.use(bodyParser.json());

// Rate limiter

const limiter = rateLimit({windowMs:15*60*1000,max:3000});
app.use(limiter)

// Database Connection
let URI = "mongodb+srv://<username>:<password>@cluster0.stlyyzv.mongodb.net/CRUD";
let OPTION = {user:"mredul", pass:"mredul123", autoIndex:true}
const connectToDatabase = async () => {
    try {
        await mongoose.connect(URI, OPTION);
        console.log('Database has been Connected!')
    } catch (error) {
        console.log('Database has not been Connected!', error)
    }
}

connectToDatabase();


 



// Managing Frontend routing
app.use(express.static('client/dist'))
app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})


// Routing Implement
app.use('/api/v1',router);

module.exports=app;



