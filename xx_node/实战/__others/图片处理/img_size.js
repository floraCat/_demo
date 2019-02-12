var gm = require('gm').subClass({imageMagick: true});//一定要加imageMagick: true，否则会报错

gm('./public/img1.jpg')
.resize(100, 100)
.write('./public/img2.jpg', function (err) {
  if (err) console.log(err);
  if (!err) console.log('done');
});

