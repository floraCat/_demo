
//分页数据状态

define(['funs'],function(Funs){

	return pageState = {

		state:{
			submitData:{}
		},

		mutations:{},

		actions:{
			data_changePage:function({ state, commit, rootState }){
				Funs.ajaxGet(rootState.topState.api,state.submitData,function(rs){
					rootState.topState.items=rs;
				});
			}
		}


	}

}); 