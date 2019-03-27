var path = require('path');
var express = require('express');
var app = express();

app.set('port',8100);

app.get("/",function (req,res) {
	res.sendfile(__dirname + '/pre/msm.html');
});

var websocket = require('./back/msm');

app.use(express.static(path.join(__dirname,'statics')));
app.listen(app.get('port'));