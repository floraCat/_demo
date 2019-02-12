
//修改弹窗数据状态

define(['funs'],function(Funs){

	return modifyState = {

		state:{
			itemMod:'',
			modId:0,
			submitData:{}
		},

		mutations:{},

		actions:{
			data_modify:function({ state, commit, rootState }){				
				Funs.ajaxPost(rootState.topState.api,state.submitData,function(rs){
					rootState.topState.items=rs;
				});
			}
		}


	}

}); 