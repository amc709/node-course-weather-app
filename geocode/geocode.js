const request = require('request');

var geocodeAddress = (address, callback) => {
  var addressEncoded = encodeURIComponent(address);

  var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}`;
  ;
  console.log(`URL:  ${url}` );
  request({
    url: url,
    json: true

  }, (error, response, body) => {

    if (error){
      callback('Unable to connect to the Google servers');
    } else if (body.status === "ZERO_RESULTS"){
      callback('Unable to find that address');
    } else if (body.status === "OK") {

      // To properly display JSON response
      // console.log(JSON.stringify(body, undefined, 2));

      callback(undefined, {
        address:  body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude:  body.results[0].geometry.location.lng


      });
      // console.log(`Formatted address:  ${body.results[0].formatted_address}`);
      //
      // console.log(`Latitude:  ${body.results[0].geometry.location.lat}`);
      // console.log(`Longiture:  ${body.results[0].geometry.location.lng}`);
    }
  });
};

// Expose some of the functions to other js modules
module.exports = {
  geocodeAddress
};
