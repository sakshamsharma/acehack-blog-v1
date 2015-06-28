var cc          = require('config-multipaas'),
    express     = require('express'),
    fs          = require('fs'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    stylus      = require('stylus'),
    nib         = require('nib')

var config      = cc(),
    app         = express()

app.use(bodyParser.json());
app.use(express.static('static'));
app.use(cors());

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
app.use(stylus.middleware(
      { src: __dirname + '/public'
        , compile: compile
      }
      ))
app.use(express.static(__dirname + '/public'))


app.get('/', function (req, res)
{
  res.render('index', { title: 'Home' })
});

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log("Listening on "+config.get('IP')+", port "+config.get('PORT'))
});
