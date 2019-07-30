
require.config(requireConf);

require(['vue','header','footer'],function(Vue,Header,Footer){

	new Vue({
        el: '#app',
		data:function(){
			return{
				test:"-----------------TEST--------------------"
			}
		}
    });

});

	