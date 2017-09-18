var express     = require('express'),
    ejs         = require('ejs'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser'),
    shortid     = require('shortid');

var app = express();

mongoose.connect('mongodb://lincoln:password@ds062448.mlab.com:62448/lincbarturlshort');

var urlSchema = new mongoose.Schema({
    destination: String,
    id : String 
});

var shortUrl = mongoose.model('Short', urlSchema);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
  res.render('index');
});

app.get("/new/:url", function (req, res) {
  var newId = shortid.generate();
  console.log(newId);
  var newShort = {
    destination: req.params.url,
    id: newId
  }
  shortUrl.create(newShort, function(err,newShort){
      res.send(newShort);  
  });
  
  console.log(newShort);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
