
//日期选择数据状态

define(['funs'],function(Funs){

	return dateState = {

		state:{
			date:new Date(),
			submitData:{},
			_datePre3:0,
			_dataPre7:0
		},

		getters:{
			datePre3:function(state){
				var timeStr = state.date;
				timeStr.setTime(timeStr.getTime()-3*60*60*1000);
				return timeStr.getFullYear()+"-" + (timeStr.getMonth()+1) + "-" + timeStr.getDate();
			},
			datePre7:function(state){
				var timeStr = state.date;
				timeStr.setTime(timeStr.getTime()-7*60*60*1000);
				return timeStr.getFullYear()+"-" + (timeStr.getMonth()+1) + "-" + timeStr.getDate();
			}
		},

		mutations:{},

		actions:{
			data_changeDate:function({ state, commit, rootState }){
				Funs.ajaxGet(rootState.topState.api,state.submitData,function(rs){
					rootState.topState.items=rs;
				});
			},
			data_change_day3:function({ state, commit, rootState }){
				Funs.ajaxGet(rootState.topState.api,state.submitData,function(rs){
					rootState.topState.items=rs;
				});
			},
			data_change_day7:function({ state, commit, rootState }){
				Funs.ajaxGet(rootState.topState.api,state.submitData,function(rs){
					rootState.topState.items=rs;
				});
			}
			
		}


	}

}); 