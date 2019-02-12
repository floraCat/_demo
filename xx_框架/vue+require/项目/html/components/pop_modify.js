
//分页
 
define(['vue','vuex','store','jquery'], function(Vue,Vuex,Store,$) {

    var pop_modify = Vue.extend({

        template:
        	'<div class="pModify">\
        		<div class="wrap">\
					<a class="i_quit" v-on:click="modCancel"></a>\
					<h5>{{itemMod.name}}的信息修改</h5>\
					<form id="modForm">\
						<dl>\
							<dt>是否关注：</dt>\
							<dd>\
								<input type="radio" name="follow" id="followYes" value="1" v-bind="{ checked:itemMod.follow==1 }" />\
								<label for="followYes">关注</label>\
								<input type="radio" name="follow" id="followNo" value="0" v-bind="{ checked:itemMod.follow==0 }" />\
								<label for="followNo">不关注</label>\
							</dd>\
						</dl>\
						<dl>\
							<dt>是否交钱：</dt>\
							<dd>\
								<input type="radio" name="payOrNot" id="payYes" value="1" v-bind="{ checked:itemMod.payOrNot==1 }"  />\
								<label for="payYes">是</label>\
								<input type="radio" name="payOrNot" id="payNo" value="0" v-bind="{ checked:itemMod.payOrNot==0 }" />\
								<label for="payNo">否</label>\
							</dd>\
						</dl>\
						<dl>\
							<dt>从事行业：</dt>\
							<dd>\
								<input class="txt" name="industry" type="text" v-model="itemMod.industry" />\
							</dd>\
						</dl>\
						<dl>\
							<dt>总财务核对交钱方式：</dt>\
							<dd>\
								<input type="radio" name="pagMode" id="pay_ali" value="1" v-bind="{ checked:itemMod.pagMode==1 }" />\
								<label for="pay_ali">支付宝</label>\
								<input type="radio" name="pagMode" id="pay_wx" value="2" v-bind="{ checked:itemMod.pagMode==2 }" />\
								<label for="pay_wx">微信</label>\
								<input type="radio" name="pagMode" id="pay_bank" value="3" v-bind="{ checked:itemMod.pagMode==3 }" />\
								<label for="pay_bank">银行转账</label>\
							</dd>\
						</dl>\
						<dl>\
							<dt>个人信息：</dt>\
							<dd>\
								<input type="radio" name="info" id="infoYes" value="1" v-bind="{ checked:itemMod.info==1 }"  />\
								<label for="infoYes">已提交</label>\
								<input type="radio" name="info" id="infoNo" value="0" v-bind="{ checked:itemMod.info==0 }" />\
								<label for="infoNo">未提交</label>\
							</dd>\
						</dl>\
						<dl>\
							<dt>物料寄送状态：</dt>\
							<dd>\
								<input class="txt" name="send" type="text" v-model="itemMod.send" />\
							</dd>\
						</dl>\
						<dl class="area">\
							<dt>培训情况：</dt>\
							<dd>\
								<textarea type="text" name="train" v-model="itemMod.train" /></textarea>\
							</dd>\
						</dl>\
						<dl>\
							<dt>客户自动提问次数：</dt>\
							<dd>\
								<input class="txt" name="numQuestion" type="text" v-model="itemMod.numQuestion" />\
							</dd>\
						</dl>\
						<dl class="area">\
							<dt>核心问题内容：</dt>\
							<dd>\
								<textarea type="text" name="content" v-model="itemMod.content" /></textarea>\
							</dd>\
						</dl>\
						<dl>\
							<dt>名下推广会员：</dt>\
							<dd>\
								<input class="txt" name="memExtend" type="text" v-model="itemMod.memExtend" />\
							</dd>\
						</dl>\
						<dl>\
							<dt>朋友圈广告次数：</dt>\
							<dd>\
								<input class="txt" name="numAD" type="text" v-model="itemMod.numAD" />\
							</dd>\
						</dl>\
						<dl>\
							<dt>今日共享收益状态：</dt>\
							<dd>\
								<input type="radio" name="share" id="share-1" value="-1" v-bind="{ checked:itemMod.share==-1 }" />\
								<label for="share-1">未到账</label>\
								<input type="radio" name="share" id="share0" value="0" v-bind="{ checked:itemMod.share==0 }" />\
								<label for="share0">未提现</label>\
								<input type="radio" name="share" id="share1" value="1" v-bind="{ checked:itemMod.share==1 }" />\
								<label for="share1">已提现</label>\
							</dd>\
						</dl>\
						<dl class="area">\
							<dt>备注：</dt>\
							<dd>\
								<textarea type="text" name="remarks" v-model="itemMod.remarks" /></textarea>\
							</dd>\
						</dl>\
						<dl class="area dlBtn">\
							<a class="btn" href="javascript:;" v-on:click="modSubmit">提交</a>\
							<a class="btn" href="javascript:;" v-on:click="modCancel">取消</a>\
						</dl>\
					</form>\
				</div>\
        	</div>',

		computed:{
			itemMod:function(){
				return Store.state.modifyState.itemMod;
			}
		},

        methods: {
            
	   	    //修改弹窗提交
	   	    modSubmit:function(){
	   	    	var dataForm=$("#modForm").serialize();
	   	    	var curPage=$(".pPage").attr("data-cur");
	   	    	var defData={
	   	    		modId:Store.state.modifyState.modId
	   	    	};
	   	    	Store.state.modifyState.submitData=dataForm+JSON.stringify(defData);
	   	    	Store.dispatch("data_modify");
	   	    	$(".pModify").hide();
	   	    	$(".bgMask").hide();
	   	    },
	   	    //修改弹窗取消
	   	    modCancel:function(){
	   	    	$(".pModify").hide();
	   	    	$(".bgMask").hide();
	   	    },

        }
    });

    Vue.component('tp-pop-modify', pop_modify);

    new Vue({
        el: '.pModify'
	});

})
