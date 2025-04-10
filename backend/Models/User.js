const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userschema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Only allows these two values
        default: 'user' // Sets default role if none specified
    }
});

const usermodel = mongoose.model('users', userschema);
module.exports = usermodel;