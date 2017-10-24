const express = require('express');
const http = require('http');
const path = require('path');

const api = require('./server/routes/api');

const app = express();
// Run the app by serving the static files
// in the dist directory

app.all('*', function(req, res, next) {
     var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
});

app.use(express.static(path.join(__dirname,'dist')));
 

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.PORT || 8080;
app.set('port',port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));
//app.listen(process.env.PORT || 8080);