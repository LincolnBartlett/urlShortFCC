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

app.get("/new/:url/*", function (req, res) {
  var newId = shortid.generate();
  console.log(req.params);
  var newShort = {
    destination: req.params[0] + req.params.url,
    id: newId
  }
  shortUrl.create(newShort, function(err,newShort){
      
    if (err){
        
      }else {
          res.send(newShort);  
      }

  });
  
});

app.get('/:id', function (req, res){
    shortUrl.findOne({id: req.params.id}, function(err, model){
      if (err){
        
      }else {
        if (model === null){
            res.redirect('back');
        } else {
            var dest = model.destination;
            console.log(dest);
            res.redirect(dest);
        }

      }
    });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
