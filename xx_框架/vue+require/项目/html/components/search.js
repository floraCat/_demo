
//分页
 
define(['vue','vuex','store','jquery'], function(Vue,Vuex,Store,$) {

    var search = Vue.extend({

        template:
        	'<ol class="mSearch">\
				<input class="key" type="text" value="" placeholder="搜索" v-model="keyword" />\
				<input class="submit" type="submit" v-on:click="search(null)" />\
			</ol>',

		data:function(){
			return{
				keyword:''
			}
		},

		computed:{
			keyword:function(){
				return Store.state.searchState.keyword;
			}
		},

        methods: {
            
            //搜索
	   	    search:function(obj){
	   	    	if(obj != null){
					//alert(obj);
				}else{
					if($(".mSearch .key").val()==""){
		   	    		alert("请输入搜索关键字！");
		   	    		return;
		   	    	}
				}
				Store.state.searchState.submitData={
					"date":this.date,
					"keyword":this.keyword
				};
	   	    	Store.dispatch("data_search");
	   	    }

        }
    });

    Vue.component('tp-search', search);

    new Vue({
        el: '.mSearch'
	});

})
