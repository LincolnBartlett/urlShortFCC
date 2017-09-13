var express = require('express'),
    ejs = require('ejs'),
    mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://lincoln:password@ds062448.mlab.com:62448/lincbarturlshort');

var urlSchema = new mongoose.Schema({
  
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
  res.render('index');
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
