
require.config({
	paths:{
		"jq":"app/jquery-1.10.2",
		"common":"app/common"
	},
	shim:{
		'app/catCarousel':['jq']
	}
});