
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
					if($('.libList .list').length>0){
						$('.libList .list dl.new').remove();
						$(function(){
						    //瀑布流
						    $('.libList .list').masonry({
						      columnWidth: 230
						    });
						});
					}
					if($(".formAdd").length>0){
						console.log(5);
						if($(".formAdd .ttl").length>0){ $(".formAdd .ttl").attr('value','');}
						if($(".formAdd .cont").length>0){ $(".formAdd .cont").attr('value','');}
					}
				});
			}
		}


	}

}); 