
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path')

const routes = require('./src/routes');
const {engine} = require ('express-handlebars');

const app = express();

let port=process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/assets',express.static(path.join(__dirname,'public')));
app.use(routes);

//Connect to Database
const db_url = process.env.DB_URL
//console.log('DB Url: ' + db_url);
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