const request = require('request')

const geoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?&limit=1&access_token=pk.eyJ1Ijoibm9kaW5nIiwiYSI6ImNrZWJrY2wyNTAwczkycWxmbGx5cGx0cDkifQ.AbbJ0a3kl8UTC0uB7wzk2g'

  request({url: url, json: true}, (error, {body}) => {
      if (error) {
          callback('Unable to connect to location services!', undefined)
      }else if (body.features.length === 0) {
          callback('Unable to find location. Try another search!', undefined)
      }else {
          callback(undefined, {
                  latitude: body.features[0].center[1],
                  longitude: body.features[0].center[0],
                  location: body.features[0].place_name
          })
      }
  })
}

module.exports = geoCode;