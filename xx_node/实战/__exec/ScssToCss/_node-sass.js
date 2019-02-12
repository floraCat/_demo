var sass = require('node-sass');


// sass.render({
//   file: './nav2.scss'
// }, function(err, result) { 
// 	console.log(44444444)
// 	console.log(result.css.toString())
// });

/*----------*/

var result = sass.renderSync({
  data: '.a{ height:12px; \n.b{ color:red;}}'
})
console.log(result.css.toString());