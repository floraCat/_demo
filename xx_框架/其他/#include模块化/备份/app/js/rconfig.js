(function(window){
	"use strict";

	var require = {
		paths:{
			//依赖包
			'jq':'../lib/jquery-1.10.2',
			//插件
			'carousel':'../plugins/catCarousel',
			//网站共用脚本
			'common':'g_common',
			'header':'g_header',
			'footer':'g_footer'
		},
		shim:{
			'carousel':['jq']
		}
	}

	window.require = require;

})(window);