
//分页
 
define(['vue','vuex','store','jquery'], function(Vue,Vuex,Store,$) {

    var pop_examine = Vue.extend({

        template:
        	'<div class="pInfos">\
			<div class="wrap">\
				<a class="i_quit" v-on:click="infoCancel"></a>\
				<div class="lt">\
					<p class="note"><i class="icon i_note"></i>您有信息待审核</p>\
					<ol class="tabs">\
						<a href="javascript:;"><i class="icon i_home"></i>个人资料<i class="arr"></i></a>\
					</ol>\
				</div>\
				<div class="rt">\
					<h3><i></i>审核中心</h3>\
					<section class="img"><div><img src="" /></div></section>\
					<ul class="list">\
						<dl><dt><i class="icon i_name"></i>姓名</dt><dd v-text="reqInfo.name"></dd></dl>\
						<dl><dt><i class="icon i_tel"></i>手机号码</dt><dd v-text="reqInfo.tel"></dd></dl>\
						<dl><dt><i class="icon i_id"></i>有效证件</dt><dd v-text="reqInfo.certi"></dd></dl>\
						<dl><dt><i class="icon i_card"></i>银行名称</dt><dd v-text="reqInfo.cardName"></dd></dl>\
						<dl><dt><i class="icon i_id"></i>身份证号</dt><dd v-text="reqInfo.ID">/dd></dl>\
						<dl><dt><i class="icon i_card"></i>银行卡号</dt><dd v-text="reqInfo.cardNum">/dd></dl>\
						<dl><dt><i class="icon i_mem"></i>推荐人</dt><dd v-text="reqInfo.recom"></dd></dl>\
						<dl><dt><i class="icon i_level"></i>等级</dt><dd v-text="reqInfo.level"></dd></dl>\
						<dl><dt><i class="icon i_addr"></i>地址</dt><dd v-text="reqInfo.addr"></dd></dl>\
						<dl><dt><i class="icon i_money"></i>从事行业</dt><dd v-text="reqInfo.industry"></dd></dl>\
					</ul>\
					<div class="btn2"><a href="javascript:;" v-on:click="infoExamine(reqInfo.id,reqInfo.index)">审核</a></div>\
				</div>\
			</div>\
		</div>',

		computed:{
			reqInfo:function(){
				return Store.state.examineState.reqInfo;
			}
		},

        methods: {
            
	   	    //资料弹窗取消
	   	    infoCancel:function(){
	   	    	$(".pInfos").hide();
	   	    	$(".bgMask").hide();
	   	    },
	   	    //资料审核
	   	    infoExamine:function(id,index){
	   	    	Store.state.modifyState.submitData={
	   	    		"action":"examineOk",
					"id":Store.state.examineState.examineId
	   	    	};
	   	    	Store.dispatch("data_examine");
	   	    }

        }
    });

    Vue.component('tp-pop-examine', pop_examine);

    new Vue({
        el: '.pInfos'
	});

})
