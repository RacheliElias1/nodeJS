const router = require ('express').Router()
const userFunction = require ('./controllers/user')
const weahterFunction = require('./controllers/weather')
const adminFunction = require('./controllers/admin')

router.post('/signUp',userFunction.signUp)
router.get('/logIn',userFunction.logIn)
router.get('/createWeather',userFunction.createWeather)

router.get('/getWeather/:user',weahterFunction.getWeather)
router.delete('/deleteWeatherById',weahterFunction.deleteWeatherById)

router.post('/createAdmin',adminFunction.createAdmin);
router.delete('/deleteUserbByAdmin/:id',adminFunction.deleteUserbByAdmin)



module.exports = router