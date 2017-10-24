const express = require('express');
const http = require('http');
const path = require('path');
 var cors = require('cors')
const app = express();
// Run the app by serving the static files
// in the dist directory


app.use(express.static(path.join(__dirname,'dist')));
 app.use(cors());
app.options('*', cors()) // include before other routes
 
 app.get('/products/:id', function(req, res, next){
  res.json({msg: 'This is CORS-enabled for all origins!'});
});
 


app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https')
    res.redirect(['https://', req.get('Host'), req.url].join(''));
  else
    next();
 
});
/*
const port = process.env.PORT || 8080;
app.set('port',port);

const server = http.createServer(app);
 server.listen(port, () => console.log('Running'));
 */
app.listen(80, function(){
  console.log('CORS-enabled web server listening on port 80');
});
