const express = require('express');
const router = require('./src/routes/api');
const app = new express();
// const bodyParser = require('body-parser');
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
// app.use(bodyParser.json());
app.use(express.json())

// Rate limiter

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 3000, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again.'
});
app.use(limiter)

// Database Connection
// let URI = "mongodb+srv://<username>:<password>@cluster0.stlyyzv.mongodb.net/CRUD";
// let OPTION = {user:"mredul", pass:"mredul123", autoIndex:true}
 let URI = "mongodb+srv://mredul:mredul123@cluster0.efdeb1w.mongodb.net/CRUD";

const connectToDatabase = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Database has been Connected!')
    } catch (error) {
        console.log('Database has not been Connected!', error)
    }
}

connectToDatabase();


 

// Managing Backend Routing Implement
app.use('/api/v1',router);


// Managing Frontend routing
app.use(express.static('client/dist'))
app.get('*', function(req, res){
    res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
})



module.exports=app;



