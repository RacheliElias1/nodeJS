const Admin = require('../models/admin');
const User = require('../models/user');
const Weather = require('../models/weather');




const createAdmin = async (req, res) => {
    let newAdmin = new Admin(req.body);
    console.log("new admin:" + newAdmin);


    try {
        await newAdmin.save();

        res.status(200).json({ admin: newAdmin })

    }
    catch (error) {
        res.status(400).send(error)
    }
}

const deleteUserbByAdmin = async (req, res) => {
    console.log("this is delete User byAdmin")

    try {
      let user= await User.findOne({"_id":req.params.id })
      console.log("tha user is"+user)
    
    
    await Weather.deleteMany({user:user._id})
        // Weather.save()
   
    // console.log (weather)
    //   await Weather.remove({user:user._id})
        await Admin.findByIdAndUpdate(user.admin,{$pull:{users:user._id}})
        await User.findByIdAndRemove(user._id)
        
        // await user.remove()
        res.status(200).json({"mssage":"the user is deleted"})
       
    }
    catch (err) {
        res.status(500).json({ err: err.mssage })
    }
} 




module.exports = { createAdmin,deleteUserbByAdmin}