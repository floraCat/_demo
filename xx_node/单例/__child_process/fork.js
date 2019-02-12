var x = 2, y = 3;

var child_process = require('child_process');

var vv = child_process.fork('fork_sub1.js');
vv.send(x);
vv.on('message', function(m) {
  x=m;
});

var ww = child_process.fork('fork_sub2.js');
ww.send(y);
ww.on('message', function(m) {
  y=m;
});


setTimeout(function () {
	process.exit(0);
}, 2000);

process.on('exit', function (code) {
	console.log(x);
	console.log(y);
})
