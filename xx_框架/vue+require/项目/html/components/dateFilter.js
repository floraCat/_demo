
//日期筛选
 
define(['vue','vuex','store','jquery'], function(Vue,Vuex,Store,$) {

    var dateFilter = Vue.extend({

        template:
        	'<ol class="date" id="jsDate">\
				<span class="years" v-on:click="showTimeDate"></span>\
				<p>年</p>\
				<span class="month" v-on:click="showTimeDate"></span>\
				<p>月</p>\
				<span class="day" v-on:click="showTimeDate"></span>\
				<p>日</p>\
				<a class="btn" v-on:click="showTimeDate">筛选</a>\
				<input type="hidden" class="input" name="date"/>\
			</ol>',

        computed:{
        	date:function() {
	            return Store.state.dateState.date;
	        }
	    },

        mounted:function(){
			//日期
			var time = this.date;
			var year=time.getFullYear(),
				month = time.getMonth(),
				day = time.getDate();
			/*月或日不够两位添加0*/
			var Appendzero = function(obj)  {  
			    if(obj<10) return "0" +""+ obj;  
			    else return obj;  
			} 
    		$(".years").text(year);		
			$(".month").text(Appendzero(month+1));
			$(".day").text(Appendzero(day));
        },

        methods: {
            
            showTimeDate: function(){
				/*分割日期*/
				var splitDate = function(t_time){
					t_time = t_time.split("-");
					var arr = new Array();
					arr[0] = t_time[0];
					arr[1] = t_time[1];
					arr[2] = t_time[2];
					return arr;
				}
				var obj=$("#jsDate .input");
				var year=this.date.getFullYear();
				$.jeDate(obj,{
					trigger:false,
					isTime:true,
					format:'YYYY-MM-DD',
					minDate:year+"-01-1", //最小日期
					maxDate:year+"-12-31", //最大日期    
					choosefun:function(elem, val, date) {
						var arr = splitDate(val);
						$(".years").text(arr[0]);
						$(".month").text(arr[1]);
						$(".day").text(arr[2]);
						Store.dispatch("data_changeDate");
					},     //选中日期后的回调, elem当前输入框ID, val当前选择的值, date当前完整的日期值
				    okfun:function(elem, val, date) {
				    	var arr = splitDate(val);
						$(".years").text(arr[0]);
						$(".month").text(arr[1]);
						$(".day").text(arr[2]);
						Store.state.dateState.submitData={
							date:Store.state.dateState.date
						};
						Store.dispatch("data_changeDate");
				    },         //点击确定后的回调, elem当前输入框ID, val当前选择的值, date当前完整的日期值
				})
			}

        }
    });

    Vue.component('tp-datefilter', dateFilter);

    new Vue({
        el: '#jsDate'
	});


})
