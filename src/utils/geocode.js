const request = require('request');
const geocode = (location, callback)=>{
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    const accessToken = 'pk.eyJ1IjoicGswNzUyIiwiYSI6ImNrNHV1YWVkbDAwa3kzZWxpM3Qyb2d5cGcifQ.SDxJ67FiYzqt1W0RQGPsrg';
    url = url + encodeURIComponent(location) + '.json';
    url = url + '?access_token=' + accessToken;
    url = url + '&limit=1';
    console.log(url)
    request({ url, json: true }, (error, {body:{features}}) => {
        if (error) {
           return callback('Unable to connect to location services!', undefined)
        }
        else if(features.length===0){
           return callback('Unable to find entered Location, Try another search', undefined);
        }
        else {
            callback(undefined, {
                lat: features[0].center[1],
                long: features[0].center[0],
                place: features[0].place_name
            });
        }
    });
}
module.exports = geocode