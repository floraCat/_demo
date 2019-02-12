
//[app]的状态
if(window.vueState=="app"){

	define(['vue','vuex','../store/app/topState',
						 '../store/app/dateState',
						 '../store/app/searchState',
						 '../store/app/pageState',
						 '../store/app/modifyState',
						 '../store/app/examineState'
			],function(Vue,Vuex,TopState,DateState,SearchState,PageState,ModifyState,ExamineState){

		Vue.use(Vuex);

		var store = new Vuex.Store({

			modules:{
				topState:TopState,
				dateState:DateState,
				searchState:SearchState,
				pageState:PageState,
				modifyState:ModifyState,
				examineState:ExamineState
			}

		});

		return store;
	});
}

/*--------------------------------------------------------*/

//[常见问题]的状态
if(window.vueState=="material"){
	define(['vue','vuex','../store/material/topState',
						 '../store/material/searchState',
						 '../store/material/pageState'
			],function(Vue,Vuex,TopState,SearchState,PageState){

		Vue.use(Vuex);

		var store = new Vuex.Store({

			modules:{
				topState:TopState,
				searchState:SearchState,
				pageState:PageState
			}

		});

		return store;
	});

}