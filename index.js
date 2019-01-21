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
    //   res.send({ status: 'ok', data:WEATHER });
    //   return;
    // }
    getWeather( location )
    .then( response => {
      response.current_observation.localTime = new Date().toLocaleString(
        'en-US', {timeZone: `${response.location.timezone_id}`}
      );
      WEATHER = response;
      res.send({ status: 'ok', data: response });
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



// var indianTimeZoneVal = new Date().toLocaleString('en-US', {timeZone: 'Asia/Kolkata'});
// var indainDateObj = new Date(indianTimeZoneVal);
// console.log(indainDateObj);

// "{"location":{"woeid":1132599,"city":"Seoul","region":" Seoul","country":"South Korea","lat":37.557121,"long":126.977379,"timezone_id":"Asia/Seoul"},"current_observation":{"wind":{"chill":21,"direction":315,"speed":2.49},"atmosphere":{"humidity":75,"visibility":10.0,"pressure":29.8,"rising":0},"astronomy":{"sunrise":"7:43 am","sunset":"5:45 pm"},"condition":{"text":"Clear","code":31,"temperature":22},"pubDate":1548100800},"forecasts":[{"day":"Tue","date":1548082800,"low":19,"high":46,"text":"Sunny","code":32},{"day":"Wed","date":1548169200,"low":26,"high":44,"text":"Sunny","code":32},{"day":"Thu","date":1548255600,"low":19,"high":40,"text":"Mostly Sunny","code":34},{"day":"Fri","date":1548342000,"low":23,"high":39,"text":"Partly Cloudy","code":30},{"day":"Sat","date":1548428400,"low":19,"high":37,"text":"Sunny","code":32},{"day":"Sun","date":1548514800,"low":19,"high":39,"text":"Sunny","code":32},{"day":"Mon","date":1548601200,"low":24,"high":42,"text":"Partly Cloudy","code":30},{"day":"Tue","date":1548687600,"low":23,"high":43,"text":"Partly Cloudy","code":30},{"day":"Wed","date":1548774000,"low":27,"high":44,"text":"Partly Cloudy","code":30},{"day":"Thu","date":1548860400,"low":26,"high":41,"text":"Partly Cloudy","code":30}]}"