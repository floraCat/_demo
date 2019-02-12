
//审核弹窗数据状态

define(['funs'],function(Funs){

	return examineState = {

		state:{
			reqInfo:{}, //当前查看的资料
			examineId:0,
			examineIndex:0,
			api:'',
			submitData:{}
		},

		mutations:{},

		actions:{
			data_info:function({ state, commit, rootState }){
				Funs.ajaxGet(state.api,state.submitData,function(rs){
					state.reqInfo=rs[0];
					$(".bgMask").show();
					$(".pInfos").show();
				});
			},
			data_examine:function({ state, commit, rootState }){
				Funs.ajaxPost(rootState.topState.api,state.submitData,function(rs){
					rootState.topState.items=rs;
					$(".bgMask").hide();
					$(".pInfos").hide();
				});
			}
		}


	}

}); 