var babel = require("babel-core");

// var _code = "let a='A'"
// var result = babel.transform(_code, {"presets":["es2015"]});
// console.log(result.code);

babel.transformFile('./es6.js',{"presets":["es2015"]},function(err,result){

	console.log(2222222);
	console.log(result.code);

})