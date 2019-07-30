import store_chart from './chart.js';
import { InsightSheet } from '../service/data.js';

const state = {
    testList: [
        {
            t2: [
                {x1: 111, x2: 222}
            ]
        },
        {
            t2: [
                {x1: 333, x2: 444}
            ]
        },
        {
            t2: []
        }
    ],
  dataInsightIdOn: 1,
  dataSourceIdOn: null,
  sheetList: [],
  sheetIdOn: 5,
  fieldList: [], // 字段数据
  tableData: [], // 表格数据
  rowLen: 0, // 维度数
  colLen: 0, // 度量数
  diffLen: 0, // 区分数
};

// getters
const getters = {

};

// actions
const actions = {
	viewAllSheet (context) {
	    return new Promise((resolve, reject) => {
            InsightSheet.viewAllSheet(context.state.dataInsightIdOn, context.state.dataSourceIdOn)
            .then((res) => {

                resolve(res);
            });
        });
	},
	dataUpdate (context) {
		let _list = window.globalState['sheet_'+context.state.sheetIdOn];
		InsightSheet.getFieldData(context.state.dataSourceIdOn, _list, context.state.fieldList)
		.then((res) => {
		context.commit('tableData', res);
            console.log('55558-- 全局状态');
            console.log(window.globalState);
        });
    },
	// 工作表-查看
	sheetView (context) {
		return new Promise((resolve, reject) => {
			InsightSheet.sheetView(context.state.sheetIdOn)
			.then((res) => {
				let _data = JSON.parse(res.configInfo);
				window.globalState['sheet_'+context.state.sheetIdOn] = _data.globalState || [];
				context.commit('rowLen', _data.storeSheet ? _data.storeSheet.rowLen : 0);
				context.commit('colLen', _data.storeSheet ? _data.storeSheet.colLen : 0);
				context.commit('diffLen', _data.storeSheet ? _data.storeSheet.diffLen : 0);
				resolve(window.globalState['sheet_'+context.state.sheetIdOn]);
				context.dispatch('dataUpdate');
			});
		});
    },
    // 工作表-新增保存
    sheetAdd (context) {
        let _data = window.globalState[context.state.sheetIdOn];
        this.InsightSheet.sheetAdd(context.state.dataInsightIdOn,context.state.dataSourceIdOn,_data)
        .then((res) => {
            context.commit('sheetIdOn', res.data.id);
        });
    },
    // 工作表-修改保存
    sheetSave (context) {
        let _data = {
            storeSheet: context.state.sheet,
            globalState: window.globalState[context.state.sheetIdOn]
        };
        InsightSheet.sheetSave(context.state.sheetIdOn,_data).then((res) => {
            alert(res.message);
        });
    },
    // 工作表-删除
    sheetDel (context, key) {
        InsightSheet.sheetDel(context.state.sheetIdOn, context.state.sheetIdOn)
        .then((res) => {
            context.commit('sheetList', {
				act: 'del',
				key: key
            });
        });
    },
};

// mutations
const mutations = {
    testListPush (state, val) {
        state.testList.push(val);
    },
    testListDel (state, index) {
        state.testList.splice(index, 1);
    },
    testList (state, {index, key, val}) {
        state.testList[index][key] = val;
    },
  dataSourceIdOn (state, value) {
    state.dataSourceIdOn = value;
  },
  sheetIdOn (state, value) {
    state.sheetIdOn = value;
  },
  fieldList (state, value) {
    state.fieldList = value;
  },
  tableData (state, value) {
    state.tableData = value;
  },
  rowLen (state, opt) {
    if (opt === 'add') { state.rowLen ++; }
    else if (opt === 'reduce') { state.rowLen --; }
    else { state.rowLen = opt; }
  },
  colLen (state, opt) {
    if (opt === 'add') { state.colLen ++; }
    else if (opt === 'reduce') { state.colLen --; }
    else { state.colLen = opt; }
  },
  diffLen (state, opt) {
    if (opt === 'add') { state.diffLen ++; }
    else if (opt === 'reduce') { state.diffLen --; }
    else { state.diffLen = opt; }
  },
  // 工作表操作
  sheetList (state, {act, key, val=''}) {
    if (act === 'add') {
        state.sheetList.push(val);
    }
    if (act === 'set') {
        state.sheetList = val;
    }
  	if (act === 'mod') {
  		state.sheetList.map((x) => {
  			if ('sheet_'+x.id === key) {
  				x.sheetName = val;
  			}
  		});
  	}
  	if (act === 'del') {
  		state.sheetList.map((x,i) => {
  			if ('sheet_'+x.id === key) {
  				state.sheetList.splice(i, 1);
  			}
  		});
  	}
  },
};


let _sheet = {
  state,
  getters,
  actions,
  mutations
};

for (let item in _sheet) {
  _sheet[item] = Object.assign(_sheet[item], store_chart[item]);
}

export default _sheet;
