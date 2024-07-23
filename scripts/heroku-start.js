const express = require('express');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');
const app = express();

app.use(sslRedirect.default());
const port = process.env.PORT || 3000;
app.use(express.json());
// Your static pre-build assets folder
app.use(express.static(path.join(__dirname, '..', 'build')));
// Root Redirects to the pre-build assets
app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, '..', 'build'));
});
// Any Page Redirects to the pre-build assets folder index.html that // will load the react app
app.get('*', function(req,res){
  res.sendFile(path.join(__dirname, '..', 'build/index.html'));
});
app.listen(port, ()=>{
  console.log("React server is running on port: ", port)
})