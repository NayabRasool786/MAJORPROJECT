// requiring mongoose 
const { required } = require('joi');
const mongoose = require('mongoose');
//creating a variable
const Schema= mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// defining userSchema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }
});

//Plugin ---> Automatically creates => Username & Password By Using Hashing & Salting.
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);