const express = require('express');
const http = require('http');
const path = require('path');
 var cors = require('cors')
const app = express();
// Run the app by serving the static files
// in the dist directory

app.use(cors());
app.use(express.static(path.join(__dirname,'dist')));
 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('*', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.PORT || 8080;
app.set('port',port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));
//app.listen(process.env.PORT || 8080);