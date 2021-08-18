const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema({
    city: {
        type: String,
        require: true
    },
    temp:{
        type:String,
        require
    },
    feels_like:{
        type:String,
        require
    },
    temp_min:{
        type:String,
        require
    },
    temp_max:{
        type:String,
        require
    },
    pressure:{
        type:String,
        require
    },
    humidity:{
        type:String,
        require
    },
   wind:{
        speed:String,
        deg:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }

})

module.exports = mongoose.model('weather', weatherSchema)