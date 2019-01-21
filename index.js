const PORT = process.env.PORT || 8000;
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const sslRedirect = require('heroku-ssl-redirect');
const getWeather = require('./getWeather');
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
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/get-weather', ( req, res ) => {
  const location = req.query.location;
  if ( location ) {
    // if( WEATHER ) {
    //   res.send({status: 'ok', data: JSON.parse( WEATHER )});
    //   return;
    // }
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