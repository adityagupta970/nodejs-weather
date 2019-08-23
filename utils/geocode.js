const request = require('request')

const geocode = (address,callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWRpdHlhZ3VwdGE5NzAiLCJhIjoiY2p5dTFpemxoMGEwZDNob2R1ZzRoMDZoaSJ9._DIblpGOnnM0C72Jiffp-Q&limit=1'
    request({url, json:true},(error,{body}) => {
        if(error) {
            callback("Unable to connect to the geolocation service",undefined)
        }
        else if(body.features.length === 0) {
            callback("Unable to find the address",undefined)
        }
        else {
            callback(undefined, {
                location:body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }

    })
}

module.exports = geocode