const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        require
    },
    password:{
        type:String,
        minlength:6,
        maxlength:10
    },
    email:{
        type:String,  
    },
    users:[
        {type:mongoose.Schema.Types.ObjectId,ref:'User' }
   ]
})

module.exports=mongoose.model('Admin', adminSchema);