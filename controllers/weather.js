const request = require('request')
const Weather = require('../models/weather')
const User = require('../models/user')


const getWeather = async (req, res) => {
    try {
        let currentWeather = await Weather.find({
            "user": req.params.user
        })
        console.log(currentWeather)
        if (currentWeather < 1) {
            res.status(400).json({
                "messege": "There is no weather for this user"
            });

        } else {
            res.status(200).json({
                "messege": "You have successfully logged in",
                currentWeather
            });
        }
    } catch (error) {
        res.status(400).json({
            errorMessege: error
        });
    }
}



const deleteWeatherById = async (req, res) => {
    try {
        let weather;
        weather = await Weather.findOneAndDelete({
            "user": req.body.user,
            "_id": req.body.id
        })
        await User.findByIdAndUpdate(weather.user, {
            $pull: {
                weathers: weather._id
            }
        })
        res.status(200).json({
            "messege": "the weather is deleted",
            weather
        })
    } catch (err) {
        res.status(500).json({
            err: err.mssage
        })
    }
}


module.exports = {
    getWeather,
    deleteWeatherById
}