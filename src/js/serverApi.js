const axios = require('axios');
const LIMIT_CITIES_BY_SUBSTRING = 18;// max - 25

const serverApi = {
  async getCitiesBySubstring( substring ) {
    let response;
    let url = `https://api.teleport.org/api/cities/?search=${substring}&limit=${LIMIT_CITIES_BY_SUBSTRING}`;
    try{
      response = await getServerData (url );
      if( response.status !== 200 ) throw new Error('unknow error');
    } catch( error ) {
      console.error( error )
      response = false;
    }
    return response.data || false;
  },

  async getCity( link ) {
    let response;
    try{
      response = await getServerData( link );
      if( response.status !== 200 ) throw new Error('unknow error');
    } catch( error ) {
      console.error( error );
      response = false;
    }
    return response.data || false;
  },

  async getWeather( place ) {
    let response;
    try{
      response = await getServerData(`/get-weather?location=${place}`);
      if( response.status !== 200 ) throw new Error('unknow error');
    } catch( error ) {
      console.error( error );
      response = false;
    }
    return response.data || false;
  },

  async getIsoAlpha( geonameid ) {
    let response, isoAlpha2;

    const url = `https://api.teleport.org/api/cities/geonameid:${geonameid}/`
    try{
      response = await getServerData( url );
      if( response.status !== 200 ) throw new Error('unknow error');
      isoAlpha2 = response.data['_links']['city:country']['href'].match(/[^iso_alpha2:][A-Z]/g)[0];
    } catch( error ) {
      console.error( error );
      response = false;
    }
    return isoAlpha2 || false;
  }
};

async function getServerData( url ) {
   return await axios.get( url );
};

module.exports = serverApi;