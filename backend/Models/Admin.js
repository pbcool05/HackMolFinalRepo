const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminschema = new Schema({
    name : {
        type : String,
        required: true,
    },
    email : {
        type : String,
        required: true,
        unique: true,
    },
    password : {
        type : String,
        required: true,
    }

})
const adminmodel = mongoose.model('admins', adminschema)
module.exports = adminmodel;