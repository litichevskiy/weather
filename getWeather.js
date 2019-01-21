const OAuth = require('oauth');

function getWeather( location ) {
  return new Promise(( resolve, reject ) => {
    const header = {
        "Yahoo-App-Id": "93CXUJ7g"
    };
    const request = new OAuth.OAuth(
      null,
      null,
      'dj0yJmk9ZVRPTzRGUWFJdzFDJnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWFl',
      '07b395675e3f4c9bdf3c74abdc8457898eee0381',
      '1.0',
      null,
      'HMAC-SHA1',
      null,
      header
    );
    request.get(
      `https://weather-ydn-yql.media.yahoo.com/forecastrss?location=${location}&format=json`,
      null,
      null,
      function (err, data, result) {
        if ( err ) reject( err );
        else resolve( JSON.parse( data ) );
      }
    );
  });
}

module.exports = getWeather;