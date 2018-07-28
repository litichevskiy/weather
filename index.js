const PORT = process.env.PORT || 8000;
const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

const sslRedirect = require('heroku-ssl-redirect');
app.use(sslRedirect(['other','development','production']));
// app.all('*',function(req,res,next){
//   if(req.headers['x-forwarded-proto']!='https') res.redirect(`https://${req.get('host')}`+req.url);
//   else next();
// });

app.use(compression({filter: shouldCompress}))
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use('/sw.js', express.static(__dirname + '/src/js/sw.js'));
app.use('/manifest.json', express.static(__dirname + '/manifest.json'));
app.get('/', (req,res) => res.sendFile(path.join(__dirname+'/index.html')) );
app.get('/index.html', (req,res) => res.sendFile(path.join(__dirname+'/index.html')) );
app.listen( PORT, () => console.log(`server listening on port ${PORT}`));

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) return false;
  else return compression.filter(req, res);
};