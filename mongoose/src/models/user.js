const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    status: {type: String, default: 'new'},
    role: {type: String, default: 'user'}
});

module.exports = model('User',schema)