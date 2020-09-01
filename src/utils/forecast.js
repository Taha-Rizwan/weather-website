const request = require('request')


const forecast = (latitude,longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=bf950cb455fb63e33309a9c9db7031a4&query='+ encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) +'&units=m'

  request({url: url, json: true}, (error, {body}) =>{
        if (error){
          callback('Unable to connect to weather service', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        } 
        else{
            callback(undefined,body.current.weather_descriptions+", it's  currently " + body.current.temperature + " degrees outside. It feels like " +body.current.feelslike + " degrees. The humidity is " + body.current.humidity + ".")   
        }
    })
}
module.exports = forecast;