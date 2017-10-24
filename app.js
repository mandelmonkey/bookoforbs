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
 

app.get('*',function(req,res,next){
  if(req.headers['x-forwarded-proto']!='https'){
    res.redirect(['https://', req.get('Host'), req.url].join(''));
}
  else{
   var origin = req.get('origin'); 
     res.header('Access-Control-Allow-Origin', origin);
     res.header("Access-Control-Allow-Headers", "X-Requested-With");
     res.header('Access-Control-Allow-Headers', 'Content-Type');
     next();
 }
})
const port = process.env.PORT || 8080;
app.set('port',port);

const server = http.createServer(app);
server.listen(port, () => console.log('Running'));
//app.listen(process.env.PORT || 8080);

