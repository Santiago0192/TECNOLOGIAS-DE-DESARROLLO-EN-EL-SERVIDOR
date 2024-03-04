const express = require('express');
const routes = require('./src/routes')
const path = require('path')
const {engine} = require ('express-handlebars')

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/assets',express.static(path.join(__dirname,'public')));
app.use(routes);

app.listen(3000, () =>{
    console.log('app is running...');
})