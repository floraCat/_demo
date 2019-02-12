
//分页
 
define(['vue','vuex','store','jquery'], function(Vue,Vuex,Store,$) {

    var pagination = Vue.extend({

        template:
        	'<div class="pPage" data-cur=1>\
				<a class="prev" v-on:click="pageChange($event)">上一页</a>\
					<a class="item" v-for="index in page" v-text="index" v-on:click="pageChange($event)"></a>\
				<a class="next" v-on:click="pageChange($event)">下一页</a>\
			</div>',

		data:function(){
			return{
				page:5 //最大展示页数
			}
		},

        mounted:function(){
			$(".pPage .item").eq(0).addClass("on");
			$(".pPage .prev").addClass("hide");
        },

        methods: {
            
            //页码切换
	   	    pageChange:function(ev){ 
	   	    	var obj=ev.target;
	   	    	if(!$(obj).hasClass("hide")){
	    			var pre=$(".pPage").attr("data-cur");
		    		var cur=$(obj).text();

		    		if($(obj).hasClass("prev")){
		    			var cur=parseInt(pre)-1;
		    			console.log(cur);
		    			$(".pPage .next").removeClass("hide");
		    			if(cur<=1){ $(".pPage .prev").addClass("hide");}
		    		}else if($(obj).hasClass("next")){
		    			var cur=parseInt(pre)+1;
		    			$(".pPage .prev").removeClass("hide");
		    			if(cur>=this.page){ $(".pPage .next").addClass("hide");}
		    		}else{
		    			if(cur==this.page){
			    			$(".pPage .next").addClass("hide");
			    			$(".pPage .prev").removeClass("hide");
			    		}else if(cur==1){
			    			$(".pPage .prev").addClass("hide");
			    			$(".pPage .next").removeClass("hide");
			    		}else{
			    			$(".pPage .prev").removeClass("hide");
			    			$(".pPage .next").removeClass("hide");
			    		}
		    		}
		    		$(".pPage").attr("data-cur",cur)
		    		$(".pPage .item").eq(cur-1).addClass("on").siblings("a").removeClass("on");
	    		}
	    		Store.state.pageState.submitData={
	    			'curPage':cur
	    		};
	    		Store.dispatch("data_changePage");
	   	    }

        }
    });

    Vue.component('tp-pagination', pagination);

    new Vue({
        el: '.pPage'
	});

})
