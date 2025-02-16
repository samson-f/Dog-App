require('dotenv').config({path: '../.env'});
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const router = require('./api/router');
const app = express();

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('MONGO_URI not found in .env file');
    process.exit(1); // Exit the process if MONGO_URI is not set
}
console.log("MONGO_URI:", process.env.MONGO_URI);

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions);

app.use(express.json());
app.use(cors());
app.use('/', router);

app.listen(3007);
