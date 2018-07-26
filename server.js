const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/images', express.static(__dirname + '/src/images'));
app.use('/fonts', express.static(__dirname + '/dist/fonts'));
app.use('/service-worker.js', express.static(__dirname + '/src/js/service-worker.js'));
app.use('/manifest.json', express.static(__dirname + '/manifest.json'));
app.get('/', (req,res) => res.sendFile(path.join(__dirname+'/index.html')) );
app.get('/index.html', (req,res) => res.sendFile(path.join(__dirname+'/index.html')) );
app.listen( PORT, () => console.log(`server listening on port ${PORT}`));