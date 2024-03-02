const express = require('express');
const routes = require('./source/routes')
const path = require('path')

const app = express();

app.use('/assets',express.static(path.join(__dirname,'public')));
app.use(routes);

app.listen(3000, () =>{
    console.log('app is running...');
})