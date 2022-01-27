'use strict';

require('dotenv');

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    accessLevel: {type: Number, default: 0},
    image: Array,
    hash: String,
    salt: String,
    contact: {
        name: String,
        address: String,
        phone: Number,
        email: String
    },
    fb: Object
});

UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

UserSchema.methods.generateJWT = function(){
    // Expiration in 60 days
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        _id: this.id,
        accessLevel: this.accessLevel,
        exp: parseInt(exp.getTime() / 1000)
    }, process.env.JWT_CERT);
};

mongoose.model('User', UserSchema);