var express     = require('express'),
    ejs         = require('ejs'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

var app = express();

mongoose.connect('mongodb://lincoln:password@ds062448.mlab.com:62448/lincbarturlshort');

var urlSchema = new mongoose.Schema({
  
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


app.get("/", function (req, res) {
  res.render('index', {id: 'none'});
});

app.get("/:id", function (req, res) {
  res.render('index', {id: req.params.id});
  console.log(req.params);
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
