// const PORT = process.env.PORT || 5000;
// const path = require('path');
// const fs = require('fs');
// const express = require('express');
// const https = require('https');
// const app = express();

// const certOptions = {
//     key: fs.readFileSync('./certificate/server.key'),
//     cert: fs.readFileSync('./certificate/server.crt'),
// }

// app.use('/dist', express.static(__dirname + '/dist'));
// app.use('/images', express.static(__dirname + '/src/images'));
// app.use('/service-worker.js', express.static(__dirname + '/dist/js/service-worker.js'));
// app.use('/sw.js', express.static(__dirname + '/src/js/sw.js'));
// app.use('/manifest.json', express.static(__dirname + '/manifest.json'));
// app.get('/', (req,res) => {
//     res.sendFile(path.join(__dirname+'/index.html'));
// });
// app.get('/index.html', (req,res) => {
//     res.sendFile(path.join(__dirname+'/index.html'));
// });

// https.createServer(certOptions, app)
// .listen( PORT, console.log(`server listening on port ${PORT}`));

/////////////////////////////////////////////////////////////////////////////

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 7000;
const app = express();
const cors = require('cors');

app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use('/service-worker.js', express.static(__dirname + '/dist/js/service-worker.js'));
app.use('/sw.js', express.static(__dirname + '/src/js/sw.js'));
app.use('/manifest.json', express.static(__dirname + '/manifest.json'));
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/index.html', (req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen( PORT, () => console.log(`server listening on port ${PORT}`));
