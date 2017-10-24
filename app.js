const express = require('express');
const http = require('http');
const path = require('path');
 
const app = express();
// Run the app by serving the static files
// in the dist directory


app.use(express.static(path.join(__dirname,'dist')));
 


app.use(function(req,res,next) {
  if (!/https/.test(req.protocol)){
     res.redirect("https://" + req.headers.host + req.url);
  } else {
     return next();
  } 
});
 
const port = process.env.PORT || 8080;
app.set('port',port);

const server = http.createServer(app);
 server.listen(port, () => console.log('Running'));
 
 