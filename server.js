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
  if(req.params.url === 'http:' || 'https:'){
    var newId = shortid.generate();
    var newShort = {
      destination: req.params.url + '/' + req.params[0],
      id: newId
    }
    
    shortUrl.create(newShort, function(err,newShort){
      if (err){
        res.redirect('back');
        }else {
            res.redirect(`/${newId}/show`);  
        }
    });
    
  }else{
    res.redirect('back');
  }
  
  
});

app.get('/:id', function (req, res){
    shortUrl.findOne({id: req.params.id}, function(err, model){
      if (err){
        res.redirect('back');
      }else {
        if (model === null){
            res.redirect('back');
        } else {
            var dest = model.destination;
            res.redirect(dest);
        }

      }
    });
});

app.get('/:id/show', function (req, res){
    shortUrl.findOne({id: req.params.id}, function(err, model){
      if (err){
        res.redirect('back');
      }else {
        if (model === null){
            res.redirect('back');
        } else {
            var originalUrl = model.destination;
            var shortUrl = `https://lincbarturlshort.glitch.me/${model.id}`;
            var output = {
              'original_URL' : originalUrl,
              'short_URL' : shortUrl
            }
          
            res.render('display',{output: output});
        }

      }
    });
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
