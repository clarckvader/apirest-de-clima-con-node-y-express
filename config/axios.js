const axios = require ('axios')

const instlugar = axios.create({
    baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php',
    headers: {"x-rapidapi-host": "devru-latitude-longitude-find-v1.p.rapidapi.com",
	"x-rapidapi-key": "6a310aad28mshc62c2a27eaa6fffp13d2cajsndae562649763"
	}
});

const instClima = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather'
});
 //Intercepta la peticion que se envia al servidor para ser modificada con nuestra api key
instClima.interceptors.request.use(config =>{
    config.params['appid'] = "b928f7638cf5f1914041084d396756b7"
    config.params['units'] = "metric";
    config.params['lang'] = "es";
    return config;
})

module.exports = {
    instlugar,
    instClima,
}