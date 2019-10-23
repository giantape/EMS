const mongoose = require('mongoose');
const Schema =  mongoose.Schema
const User = new Schema({
    first_name: String,
    last_name: String,
    gender: String,
    adress: String,
    zipcode: String,
    city: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);