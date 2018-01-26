const request = require('request');


// darksky.net key:  e29de9acf220a2f184da2cfc5d3fbfd2

// Weather forecast url: https://api.darksky.net/forecast/e29de9acf220a2f184da2cfc5d3fbfd2/38.8444728,-77.2769131

var getWeather = (latitude, longitude, callback) => {
  var key = 'e29de9acf220a2f184da2cfc5d3fbfd2';
  // var latitude = 38.8444728;
  // var longitude = -77.2769131;
  var url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;

  request({
      url: url,
      json: true
    }
    ,(error, response, body ) => {
      if (error){
        callback('Unable to connect to forecast.io site');
      } else if (!error && response.statusCode === 200){
        callback(undefined, {
          temperature:  body.currently.temperature,
          feelsLikeTemperature:  body.currently.apparentTemperature
        });
      } else {
        callback('Unable to get weather info');
      }

  });
};

module.exports.getWeather = getWeather;
