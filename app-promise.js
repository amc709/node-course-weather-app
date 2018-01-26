const yargs = require('yargs');
const axios = require('axios');

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

var addressEncoded = encodeURIComponent(argv.address);
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}`;

// Make API call to get address info
axios.get(url)
  .then((response) => {
    // console.log(JSON.stringify(response, undefined, 2));

    // If it is an invalid address
    if (response.data.status === 'ZERO_RESULTS'){
      throw new Error("Unable to find that address");
    }

    // Proceed to get the key address info to pass on to the weather API call
    console.log(response.data.results[0].formatted_address);

    // Compose weather API URL with the proper inputs
    var key = 'e29de9acf220a2f184da2cfc5d3fbfd2';
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    var url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;

    // Make weather API call
    axios.get(url)
      .then((response) => {
        // API call is good
        var temperature = response.data.currently.temperature;
        var feelsLikeTemp = response.data.currently.apparentTemperature;

        console.log(`It's currently ${temperature} but feels like ${feelsLikeTemp}`);
      });
  }).catch((error) => {
    if (error.code === 'ENOTFOUND'){
      console.log('Unable to connect to API server');
    } else {
      console.log(e.message);
    }
  });
