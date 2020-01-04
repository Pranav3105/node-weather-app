const request = require('request');
const forecast = (lat, long, callback)=>{
    const url = 'https://api.darksky.net/forecast/9051f30191060ff7a3032816e95d4e0a/'+lat+','+long+'?units=si'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast services!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipitation: body.currently.precipProbability
            })
        }
    });
}
module.exports=forecast