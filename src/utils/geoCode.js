const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    // encodeURIComponent(address)+
    ".json?access_token=pk.eyJ1IjoicHVza2k5NiIsImEiOiJja25hOTJzeTAwenRjMnJ0YXQwMzRpNWV4In0.ElYpo9WdpgCbQsFCYrBsvg";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[0],
        long: body.features[0].center[1],
        location: body.features[1].place_name,
      });
    }
  });
};

module.exports = geoCode;
