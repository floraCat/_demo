(function(window){
	"use strict";

	var require = {
		baseUrl:"js/",
		paths:{
			"jq":"app/jquery-1.10.2",
			"common":"app/common"
		},
		shim:{
			'app/catCarousel':['jq']
		}
	}

	window.require = require;

})(window);


// require.config({
// 	baseUrl:'js',
// 	paths:{
// 		"jq":"lib/jquery-1.10.2",
// 		"common":"app/common"
// 	}
// });