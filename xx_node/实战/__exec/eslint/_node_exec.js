
var child_process = require('child_process');

// var vv = child_process.execFile('node-sass nav2.scss nav2.css');
var vv = child_process.execSync('eslint --fix js1.js');
// var vv = child_process.execSync('node -v');
// vv.on('close', function (code) {
//   console.log(111111)
//   console.log(code)
// });