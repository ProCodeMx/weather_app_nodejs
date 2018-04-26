const axios = require('axios')

const weather_api_key = 'fb723c6236e9cfe20567d7107752da86';
const google_api_key = 'AIzaSyArXtPNomoHZqTWgcPZ79WFFOT3gg8f1Cw';


const getCityCoords = async(lugar) => {

    let encoded_url = encodeURI(lugar);

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_url}&key=${google_api_key}`);

    if (resp.data.status == "ZERO_RESULTS") {
        throw new Error(`No hay resultados para la ciudad ${encoded_url}`)
    }

    let ref = resp.data.results[0];
    let lat = ref.geometry.location.lat;
    let lng = ref.geometry.location.lng;
    let direccion = ref.formatted_address;

    return {
        direccion,
        lat,
        lng
    }
}


const getWeatherInfo = async(city) => {
    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&units=metric&appid=${weather_api_key}`);
    return resp.data.main.temp;
};


module.exports = {
    getCityCoords,
    getWeatherInfo
}