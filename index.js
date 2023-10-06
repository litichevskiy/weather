const PORT = process.env.PORT || 8000;
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const getWeather = require('./getWeather');

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
  if ( !location ) res.status(400).send(`Parameter 'location' can not be empty`);
  getWeather( location )
  .then( response => {
    if( response.current_observation ) {
      response.current_observation.localTime = new Date().toLocaleString(
        'en-US', {timeZone: `${response.location.timezone_id}`}
      );
    }

    res.send({ status: 'ok', data: response });
  })
  .catch(error => {
    res.send({status: '', message: error });
  });
});

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false;
  else return compression.filter(req, res);
};