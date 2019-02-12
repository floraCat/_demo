

//资源配置
require.config(requireConf);


window.vueState='app';

require(['vue','vuex','store','jquery','jedate',
	'dateFilter',
	'search',
	'pagination',
	'pop_modify',
	'pop_examine'
	],function(Vue,Vuex,Store,$,jedate){

	var vm = new Vue({

	    el:'.pTable',

	    Store,

	    computed:{
	    	items:function(){
	    		return Store.state.topState.items;
	    	}
	    },

	    mounted:function(){

	    	//请求路径
	    	Store.state.topState.api=API.baseData;
	    	Store.state.examineState.api=API.examineInfo;

	    	//初始列表数据
			Store.dispatch("data_default");

	    },

	    methods:{
   	    
			//前3天
			getdateTime3:function(num){
				Store.state.dateState.submitData={
					date:Store.getters.datePre3
				};
				Store.dispatch("data_change_day3");
			},
			//前7天
			getdateTime7:function(num){
				Store.state.dateState.submitData={
					date:Store.getters.datePre7
				};
				Store.dispatch("data_change_day7");
			},
			//特别关注
	   	    hintMethod:function(){
	   	    	var url="data/rs_search.txt";
	   	    	var submitData={"isFollow":"yes"};
	   	    	this.$ajaxGet(url,submitData);
			},

	   	    /*----------------------------------------------------------------------*/

	   	    //点击修改
	   	    modify:function(index){
	   	    	$(".pModify").show();
	   	    	$(".bgMask").show();
	   	    	Store.state.modifyState.itemMod=this.items[index];
	   	    	Store.state.modifyState.modId=index;
	   	    },

	   	    /*----------------------------------------------------------------------*/

	   	    //点击查看资料
	   	    infoCheck:function(id,index){
	   	    	Store.state.examineState.examineId=id;
	   	    	Store.state.examineState.examineIndex=index;
	   	    	Store.state.modifyState.submitData={
	   	    		"action":"examineOk",
					"id":Store.state.examineState.examineId
	   	    	};
	   	    	Store.dispatch("data_info");				
			},

	   	    /*----------------------------------------------------------------------*/

	   	    //点击显示更多
	   	    showMore:function(obj){
	   	    	var minHeight=$(obj.$event.target).outerHeight();
	   	    	var trueHeight=$(obj.$event.target).siblings("i").outerHeight();
	   	    	console.log(minHeight);
	   	    	if(trueHeight>minHeight){
	   	    		$(obj.$event.target).parent("ol").append('<div class="window">'+$(obj.$event.target).text()+'<div class="quit"></div></div>');
	   	    		$(obj.$event.target).parent("ol").addClass("openWindow");
	   	    		$(obj.$event.target).parents("td").on("click",".quit",function(){
	   	    			$(this).parents(".window").remove();
	   	    			$(this).parents("ol").removeClass("openWindow");
	   	    		});
	   	    	}
	   	    }
	   	}
	});


	//过滤器
	Vue.filter('fYesOrNo', function(value) {
		if(value==0){ return '否';}
		if(value==1){ return '是';}
	});
	Vue.filter('fOkOrNot', function(value) {
		if(value==0){ return '未审核';}
		if(value==1){ return '已审核';}
	});
	Vue.filter('fInfo', function(value) {
		if(value==0){ return '未提交';}
		if(value==1){ return '已提交';}
	});
	Vue.filter('fShare', function(value) {
		if(value==-1){ return '未到账';}
		if(value==0){ return '未提现';}
		if(value==1){ return '已提现';}
	});
	Vue.filter('fPayMode', function(value) {
		if(value==1){ return '支付宝';}
		if(value==2){ return '微信';}	
		if(value==3){ return '银行转账';}	
	});


});


	