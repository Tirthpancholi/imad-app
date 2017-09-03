var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user: 'tirthinbusn',
    database: 'tirthinbusn',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles =  {
    'article-one': {
    title: 'Article One|Tirth Pancholi',
    heading: 'Article One',
    date: 'Aug 16, 2017',
    content: `
            <p>
                 This is content of my first article.This is content of my first article.
                 This is content of my first article.This is content of my first article.
                 This is content of my first article.This is content of my first article.
            </p>`
},
    'article-two': {
    title: 'Article Two|Tirth Pancholi',
    heading: 'Article Two',
    date: 'Aug 16, 2017',
    content: `
            <p>
                 This is content of my second article.This is content of my second article.
                 This is content of my second article.This is content of my second article.
                 This is content of my second article.This is content of my second article.
            </p>`
},
    'article-three': {
         title: 'Article Three|Tirth Pancholi',
    heading: 'Article Three',
    date: 'Aug 16, 2017',
    content: `
            <p>
                 This is content of my third article.This is content of my third article.
                 This is content of my third article.This is content of my third article.
                 This is content of my third article.This is content of my third article.
            </p>`
    }
    };

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;

var htmlTemplate = `<html>
<head>
    <title>
        ${title}
    </title>
    <meta name="viewport" content="width=device=width, iniial-scale=1" />
    <link href="/ui/style.css" rel="stylesheet" />
</head>
<body>
    <div class="container">
    <div>
        <a href="/">Not here..</a>
    </div>
    <hr/>
    <h3>
        ${heading}
    </h3>    
        <div>
          ${date}
        </div>
           <div>
             ${content}
           </div>
        </div>
    </body>
</html>`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db', function (req, res){
    //make a select request
    //return a response to the results
    pool.query('SELECT * FROM test', function (err, result) {
        if (err) {
            res.ststus(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
        
    });
});

var counter = 0;
app.get('/counter', function(req, res)
{ counter = counter + 1;
res.send(counter.toString());
});
var names = [];
app.get('/submit-name', function(req, res){ // /submit-name?name=xxxxx 
  // Get the name from the request
  var name = req.query.name;
  
  names.push(name);
  // JSON: JavaScript Object Notation
  res.send( JSON.stringify(names));
    
});

app.get('/articles/:articleName', function(req, res){
    // articleName == article-one
    //articles[articlename] == {} content object for article one
    
    pool.query("SELECT * from WHERE title = " + req.params.articleName, function (err, result){
       if(err){
           res.status(500).send(err.toString());
       }else {
           if(result.rows.length === 0) {
               res.status(404).send("Article not found");
           }else {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
           }
       } 
       
    });
});



app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
