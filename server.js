// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API to return unix time and utc time
app.get("/api/timestamp/:date_string?", function (req, res) {
  var dateString = req.params.date_string;
  var reg = /^\d+$/;
  var date;
  
  if (dateString) { // any input
    if (reg.test(dateString)) { // evaluate integer value (unix time)
      date = new Date();
      date.setTime(dateString);
    } else { // evalute string as date
      date = new Date(dateString);
    }
  } else { // no string, return current time
    date = new Date();
  }
  res.json({"unix":date.getTime() , "utc": date.toUTCString()});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});