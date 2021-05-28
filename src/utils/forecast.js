const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bf4d0fde715efbdba316afd9273c3dea&query='+latitude+','+longitude+'&units=f';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.current;
            callback(undefined,`${data.weather_descriptions[0]}, Its currently ${data.temperature} degrees out, It feels like ${data.feelslike} degrees out`);
        }
    });
}

module.exports = forecast;