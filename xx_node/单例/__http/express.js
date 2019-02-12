var path = require('path');
var express = require('express');
var app = express();

app.set('port', process.env.PORT || 8000);

app.get('/', function(req, res) {
   res.send('Hello World');
});

app.get('/about', function(req, res) {
   res.send('Page about');
});


app.post('/apiAdd',function (req,res) {
	req.query = req.body;
	res.send(req.query);
});


app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'));