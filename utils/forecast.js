const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2af8b77f4ab98ff739d322573ea2f4cf/'+latitude+","+longitude+"?units=si"

    request({url, json:true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to the weather service',undefined)
        }
        else if(body.error) {
            callback('Unable to find the location')
        }
        else {
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temperature:body.currently.temperature,
                precipProbability:body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast