const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String, required: false}
});

module.exports = model('User',schema)