const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Nombre de la ciudad',
        demand: true
    }
}).argv;

const api = require('./api/api');

let getWeather = async() => {

    try {
        let city_info = await api.getCityCoords(argv.direccion);
        let weather_info = await api.getWeatherInfo(city_info);

        return `El clima en ${city_info.direccion} es de ${weather_info}ºC`
    } catch (error) {
        return `No se puede obtener el clima en ${argv.direccion}`
    }

}


getWeather().then(msg => {
    console.log(msg);
}).catch(e => console.log("Error:", e));

// api.getCityCoords(argv.direccion)
//     .then(resp => {
//         api.getWeatherInfo(resp).then(result => {
//             console.log(result);
//         }).catch(e => console.log("Error:", e))
//     })
//     .catch(e => console.log("Error:", e))