const request = require("request");

const forecast = (long, lat, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=f9457ea866f0b293efc50ee3ec688dc1&query=" +
    lat +
    "," +
    long;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Error ", undefined);
    } else if (body.error) {
      callback("Error intern ", undefined);
    } else {
      callback(
        undefined,
        "It is currently " +
          body.current.temperature +
          " degrees out. There is " +
          body.current.precip +
          "% chance of rain. There is " +
          body.current.weather_descriptions[0]
      );
    }
  });
};

module.exports = forecast;
