var path = require('path');
var express = require('express');
var app = express();
var websocket = require('./back/socketBack');

// json解析中间件 for post
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.set('port',3000);

app.get("/",function (req,res) {
	res.sendfile(__dirname + '/pre/socketPre.html');
});

app.use(express.static(path.join(__dirname,'statics')));
app.listen(app.get('port'));