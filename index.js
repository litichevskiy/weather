const PORT = process.env.PORT || 8000;
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const sslRedirect = require('heroku-ssl-redirect');
const OAuth = require('oauth');

let WEATHER;

app.use(sslRedirect(['other','development','production']));
app.use(compression({filter: shouldCompress}))
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use('/sw.js', express.static( __dirname + '/dist/js/sw.js', {
  setHeaders: function(res, path) {
    res.set('Cache-Control','max-age=0, no-cache, no-store, must-revalidate');
  }
}));
app.use('/manifest.json', express.static(__dirname + '/manifest.json'));
// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname+'/index.html'));
// });

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/temporarily_unavailable.html'));
});

app.get('/get-weather', ( req, res ) => {
  const location = req.query.location;
  if ( location ) {
    if( WEATHER ) {
      res.send({status: 'ok', data: JSON.parse( WEATHER )});
      return;
    }
    getWeather( location )
    .then( response => {
      WEATHER = response;
      res.send({status: 'ok', data: JSON.parse( WEATHER )});
    })
    .catch(error => {
      res.send({status: '', data: error });
    })
  }
});

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false;
  else return compression.filter(req, res);
};

function getWeather( location ) {
  // var OAuth = require('oauth');
  return new Promise(( resolve, reject ) => {
  var header = {
      "Yahoo-App-Id": "93CXUJ7g"
  };
  var request = new OAuth.OAuth(
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
      else resolve( data );
    }
  );
  });
}