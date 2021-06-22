/*
  WEATHER-API
  https://www.weatherbit.io/
  https://www.weatherapi.com/docs/
  https://openweathermap.org/api
*/
const fetch = require('node-fetch');
const crg = require('country-reverse-geocoding').country_reverse_geocoding();

const API_KEY = '7c0a91352708446eb11afe87c8d4ca6c';
const WEATHER_API_URL = 'https://api.weatherbit.io/v2.0/forecast/daily';
const FORECASTS_DAYS = 5;
const DEFAULT_QUERY_PARAM = `?key=${API_KEY}&days=${FORECASTS_DAYS}`;

const getWeather = ( query ) => {

  return fetch( `${WEATHER_API_URL}${DEFAULT_QUERY_PARAM}&city=${query}` )
  .then( response => {
    if( response.status === 429 ) throw( 'Too many requests' )
    else if( response.status === 503 ) throw('Too frequent requests')
    else if( response.status === 204 ) return response.text();
    else return response.json();
  })
  .then( response => {
    if( !response ) return notResult();
    else if( response.error ) throw( response.error );
    else if( response.data ) return formatWeatherData( response );
    else throw('epmty response');
  });
};

const notResult = () => {
  return{ location: null, current_observation: null, forecasts: null };
}

const formatWeatherData = ( weatherData ) => {
  const { lat, lon } = weatherData;
  const country = crg.get_country( +lat, +lon );
  const { city_name, country_code, timezone, data } = weatherData;
  const { ts, wind_dir, wind_spd, rh, vis, pres, sunrise_ts, sunset_ts, temp, weather } = weatherData.data[0];

  const location = {
    "city": city_name,
    "region": country_code,
    "country": country.name || country_code,
    "timezone_id": timezone,
  };

  const sunset = new Date( sunset_ts * 1000 ); //1000 because date_epoch in seconds
  const sunrise = new Date( sunrise_ts * 1000 ); //1000 because date_epoch in seconds

  const current_observation = {
    "pubDate": ts,
    "wind":{
      "direction": wind_dir,
      "speed": wind_spd,
    },
    "atmosphere":{
      "humidity": rh,
      "visibility": vis,
      "pressure": pres,
    },
    "astronomy":{
      "sunrise": `${sunrise.getHours()}:${sunrise.getMinutes()} am`,
      "sunset": `${sunset.getHours() - 12}:${sunset.getMinutes()} pm`
    },
    "condition":{
       "text": weather.description,
       "code": weather.code,
       "temperature": temp
    },
  }

  const forecasts = data.map( item => {
    const { ts: date, max_temp: high, min_temp: low, weather } = item;
    const { description: text, code } = weather;
    return { "day": ts, date, low, high, text, code };
  });

  return { location, current_observation, forecasts };
};

module.exports = getWeather;