const _KEY = '1533040504331';
const PORT = process.env.PORT || 8000;
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
const sslRedirect = require('heroku-ssl-redirect');
const requestIp = require('request-ip');
const fs = require('fs');

app.use(requestIp.mw());
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
  const cookie = req.headers.cookie || '';
  const isFirst = /twpwa=1w54f4u26q404g0L916/.test( cookie );
  if ( !isFirst ) {
    const ip = req.clientIp;
    res.set('Set-Cookie', 'twpwa=1w54f4u26q404g0L916; Expires=Sat, Dec 01 2020 18:46:06 GMT; SameSite = Strict; HttpOnly');
    addCookieinLog( ip );
  }
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/get-log-file', (req, res) => {
  if(req.headers['x-_key'] === _KEY ) res.send({data: fs.readFileSync('log.txt', 'utf8')});
});
app.listen( PORT, () => console.log(`server listening on port ${PORT}`));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false;
  else return compression.filter(req, res);
};

function addCookieinLog( ip ) {
  fs.appendFile('log.txt', `ip: ${ip} date: ${Date.now()};`, function(error){
    if(error) throw error;
  });
};