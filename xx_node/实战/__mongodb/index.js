var path = require('path');
var express = require('express');
var app = express();
var queryHandle = require('./queryHandle.js');

// json解析中间件 for post
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('port',3000);
app.set('views', path.join(__dirname,'views'));

app.get("/",function (req,res) {
	res.sendfile(__dirname + '/dist/http.html');
});

app.get('/apiGet',function (req,res) {
	queryHandle('test3',req,res);
});

app.post('/apiAdd',function (req,res) {
	req.query = req.body;
	queryHandle('test3',req,res);
});

app.post('/apiUpdate',function (req,res) {
	req.query = req.body;
	queryHandle('test3',req,res);
});

app.post('/apiDel',function (req,res) {
	req.query = req.body;
	queryHandle('test3',req,res);
});

app.use(express.static(path.join(__dirname,'statics')));
app.listen(app.get('port'));