const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv
  ;

var address = argv.address;

geocode.geocodeAddress(address, (errorMsg, result) => {
  if (errorMsg){
    console.log(errorMsg);
  } else {
    // console.log(JSON.stringify(result, undefined, 2));

    weather.getWeather(result.latitude, result.longitude, (errorMsg, weatherResult) => {
      if (errorMsg){
        console.log(errorMsg);
      } else {
        console.log(result.address);
        console.log(`It's ${weatherResult.temperature} degrees but feels like ${weatherResult.feelsLikeTemperature}`);
      }

    });
  }

});
