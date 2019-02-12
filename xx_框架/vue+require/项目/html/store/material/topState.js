
//数据状态

define(['funs'],function(Funs){

	return topState = {

		state:{
			items:[],
			api:'',
			submitData:{}
		},

		mutations:{},

		actions:{
			data_default:function({ state, commit, rootState }){
				Funs.ajaxGet(state.api,state.submitData,function(rs){
					state.items=rs;
					if($('.libList .list').length>0){
						$(function(){
						    //瀑布流
						    $('.libList .list').masonry({
						      columnWidth: 230
						    });
						});
					}
				});
			}
		}


	}

}); 