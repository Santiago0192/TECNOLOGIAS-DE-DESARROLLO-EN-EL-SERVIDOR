
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose')
const routes = require('./src/routes');

const app = express();

app.use(routes);

let port=process.env.PORT || 3000;

//Connect to Database
const db_url = process.env.DB_URL
async function connect() {
    try{
        await mongoose.connect(db_url);
        app.listen(port, () => {
            console.log('App is running in port '+ port);
        });
    }catch(e){
        console.log('failed to connect to db',e);
    }
}

connect();