var cc          = require('config-multipaas'),
    express     = require('express'),
    fs          = require('fs'),
    bodyParser  = require('body-parser'),
    cors        = require('cors'),
    stylus      = require('stylus'),
    nib         = require('nib'),
    md          = require("node-markdown").Markdown,
    mysql       = require('mysql')

var config      = cc(),
    app         = express()


var mysqlHost = process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost';
var mysqlUser = process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root';
var mysqlPass = process.env.OPENSHIFT_MYSQL_DB_PASSWORD || '0808';

var connection = mysql.createConnection({
  host     : mysqlHost,
  user     : mysqlUser,
  password : mysqlPass,
  database : 'acehack'
});

connection.connect();

app.use(bodyParser.json());
app.use(express.static('static'));

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
      connection.query('SELECT * from Technical', function(err, newtech, fields){
        connection.query('SELECT * from Musings', function(err, newmus, fields){
          res.render('index', { title: 'AceHack', md:md, markdownContent:data, technical: newtech, musings: newmus})
        })
      })
  })
});

app.get('/articles', function (req, res) {
  connection.query('SELECT * from Technical', function(err, newtech, fields){
    connection.query('SELECT * from Musings', function(err, newmus, fields){
      res.render('articles', { title: 'Articles', technical: newtech, musings: newmus})
    })
  })
})

app.get('/technical', function(req, res) {
  connection.query('SELECT * from Technical WHERE Url = \'/technical?aname=' + req.query.aname + '\'', function(err, rows, fields){
    if (err || rows.length == 0) res.render('error', { title: 'Error', md:md, markdownContent:"Sorry, the given file does not exist."})
    else {
      var data = new Buffer(rows[0].Content, 'base64').toString()
      connection.query('SELECT * from Technical', function(err, newtech, techfields){
        connection.query('SELECT * from Musings', function(err, newmus, fields){
          res.render('viewer', { title: rows[0].Name, md:md, markdownContent:data, technical: newtech, musings: newmus})
        })
      })
    }
  })
})

app.get('/musings', function(req, res) {
  connection.query('SELECT * from Musings WHERE Url = \'/musings?aname=' + req.query.aname + '\'', function(err, rows, fields){
    if (err || rows.length == 0) res.render('error', { title: 'Error', md:md, markdownContent:"Sorry, the given file does not exist."})
    else {
      var data = new Buffer(rows[0].Content, 'base64').toString()
      connection.query('SELECT * from Technical', function(err, newtech, techfields){
        connection.query('SELECT * from Musings', function(err, newmus, fields){
          res.render('viewer', { title: rows[0].Name, md:md, markdownContent:data, technical: newtech, musings: newmus})
        })
      })
    }
  })
})

app.get('/almanac', function(req, res) {
  fs.readFile("public/md/almanac.md", 'utf8', function(err, data) {
    if (err) res.render('viewer', { title: 'Error', md:md, markdownContent:"Sorry, the given file does not exist."})
    else
      connection.query('SELECT * from Technical', function(err, newtech, techfields){
        connection.query('SELECT * from Musings', function(err, newmus, fields){
          res.render('viewer', { title: 'Almanac', md:md, markdownContent:data, technical: newtech, musings: newmus})
        })
      })
  })
})

app.get('/cv', function(req, res) {
  res.render('cv', { title: 'CV' })
})

app.get('/cvnew', function(req, res) {
  res.render('cvnew', { title: 'CV' })
})

app.get('/contact', function(req, res) {
  res.render('contact', { title: 'Contact Me' })
})

app.use(function(req, res) {
  res.redirect(301, 'http://www.acehack.org')
})

app.listen(config.get('PORT'), config.get('IP'), function () {
  console.log("Listening on "+config.get('IP')+", port "+config.get('PORT'))
});
