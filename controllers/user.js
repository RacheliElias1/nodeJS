const User = require('../models/user')
const Admin = require('../models/admin')
const Weather = require('../models/weather')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

const logIn = async (req, res) => {
    try {
        currentUser = await User.findById(req.params.id)
        if (currentUser == null) {
            res.status(400).json({
                "messege": "don't have this user,you need to register"
            });
        } else {
            let decoded = jwt.verify(currentUser.token, process.env.SECRET)
                console.log(decoded);
            if (currentUser.password == req.body.password) {
                // let token = jwt.sign({
                //     name: req.body.name,
                //     password: req.body.password
                // }, process.env.SECRET)
                console.log(token);
                res.send(currentUser)
                res.status(200).json({
                    "messege": "You have successfully logged in",
                    token,
                    currentUser
                });
                
            } else {
                res.status(400).json({
                    "messege": "The password is incorrect, please try again"
                });
            }
        }
    } catch (error) {
        res.status(400).json({
            errorMessege: error.errorMessege
        });
    }

}

const signUp = async (req, res) => {
    let newUser = new User(req.body);
    console.log("new usre:" + newUser);
    newUser.admin = req.params.admin;

    try {
        await newUser.save();
        await Admin.findByIdAndUpdate(req.params.admin, {
            $push: {
                users: newUser._id
            }
        })
        let token = jwt.sign({
            password: req.body.password,
            name: req.body.name,
            email: req.body.email
        }, process.env.SECRET)
        console.log(token);
        res.status(200).json({
            user: newUser,
            token
        })
        sendEmail(newUser.email)

    } catch (error) {
        res.status(400).send(error)
    }
}

const createWeather = async (req, res) => {
    let decoded = jwt.verify(req.headers['authorization'], process.env.SECRET)
    console.log(decoded);
    if (decoded.name != req.body.name) {
        res.status(401).json({
            "messege": "the token is invalid"
        })
    }
    try {
        let city = req.body.city
        console.log(city)
        const data = await requestApi(city)

        let weather = JSON.parse(data)
        console.log("resss : " + weather.main)

        let user = decoded.user;
        console.log(user)
        const cWeater = new Weather(weather.main);
        cWeater.city = city;
        cWeater.wind.speed = weather.wind.speed;
        cWeater.wind.deg = weather.wind.deg
        cWeater.user = user;
        await cWeater.save()
        console.log("the Weatheris:" + cWeater)
        console.log("ther res isssss" + data)
        let arrUser = await User.findByIdAndUpdate(req.body.user, {
            $push: {
                weathers: cWeater._id
            }
        })
        await arrUser.save();
        res.status(200).json({
            newWeather: cWeater
        })
    } catch (error) {
        res.status(400).send(error)
    }
}


const requestApi = (city) => {
    return new Promise((resolve, reject) => {

        console.log('requestApi');
        let options = {
            method: "GET",
            url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY_WEATHER}`
        }

        request(options, (err, res, body) => {
            if (err)
                reject(err)

            else {
                resolve(body)
            }
        })

    })
}


const sendEmail = (email) => {
    return new Promise((resolve, reject) => {

        console.log(`mail: ${email}`);
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'rache654@gmail.com',
                pass: process.env.MY_PASSWORD
            }
        });

        var mailOptions = {
            from: 'rache654@gmail.com',
            to: email,
            subject: `Welcome to our app!!!`,
            text: 'ברוכים הבאים'
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                reject(error)
                //   console.log(`error ${error}`);
            } else {
                resolve(info)
                //   console.log('Email sent: ' + info.response);
            }
        });

    })
}





module.exports = {
    signUp,
    logIn,
    createWeather
}