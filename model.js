const mongoose = require('mongoose');

let  Registeruser = new mongoose.Schema({
    username:{
        type : String,
        required : true,

    },
    emaqil :{
        type : String,
        required : true,
        unique : true,
    },
    password :{
        type : String,
        required : true,
    }
})

module.exports = mongoose.model('Registeruser', Registeruser)