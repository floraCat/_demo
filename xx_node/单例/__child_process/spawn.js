var x,y;

var child_process = require('child_process');


var vv = child_process.execFile('node -v');
vv.on('close', function (code) {
  x=2;
});

var ww = child_process.execFile('node -v');
ww.on('close', function (code) {
  y=3;
});

process.on('exit', function (code) {
	console.log('---'+(x+y));
})
