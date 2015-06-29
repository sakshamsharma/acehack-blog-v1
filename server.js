var cc          = require('config-multipaas'),
    express     = require('express'),
    fs          = require('fs'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    stylus      = require('stylus'),
    nib         = require('nib'),
    md          = require("node-markdown").Markdown

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
app.use(stylus.middleware({ 
  src: __dirname + '/public'
  , compile: compile
}))
app.use(express.static(__dirname + '/public'))


app.get('/', function (req, res)
{
  fs.readFile("public/md/reveries.md", 'utf8', function(err, data) {
    if (err) res.render('articles', { title: 'Articles', md:md, markdownContent:"Sorry, the given file does not exist."})
    else
      res.render('index', { title: 'AceHack', md:md, markdownContent:data})
  })
});

app.get('/login', function (req, res)
{
  res.render('login', { title: 'Login' })
});

app.get('/articles', function (req, res) {
})

app.get('/technical', function(req, res) {
  fs.readFile("public/md/" + req.query.aname + ".md", 'utf8', function(err, data) {
    if (err) res.render('articles', { title: 'Articles', md:md, markdownContent:"Sorry, the given file does not exist."})
    else
      res.render('viewer', { title: 'Technical', md:md, markdownContent:data})
  })
})

app.get('/musings', function(req, res) {
  fs.readFile("public/md/" + req.query.aname + ".md", 'utf8', function(err, data) {
    if (err) res.render('articles', { title: 'Articles', md:md, markdownContent:"Sorry, the given file does not exist."})
    else
      res.render('viewer', { title: 'Musings', md:md, markdownContent:data})
  })
})

app.get('/almanac', function(req, res) {
  fs.readFile("public/md/almanac.md", 'utf8', function(err, data) {
    if (err) res.render('articles', { title: 'Articles', md:md, markdownContent:"Sorry, the given file does not exist."})
    else
      res.render('viewer', { title: 'Almanac', md:md, markdownContent:data})
  })
})

app.get('/cv', function(req, res) {
  res.render('cv', { title: 'CV' })
})

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log("Listening on "+config.get('IP')+", port "+config.get('PORT'))
});
