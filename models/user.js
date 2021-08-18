const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
    name: {
        type: String,

    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 10,
    },
    email: {
        type: String,
        required: true
    },
    weather: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'weather'
    }],
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    }


})


module.exports = mongoose.model('user', userSchema)