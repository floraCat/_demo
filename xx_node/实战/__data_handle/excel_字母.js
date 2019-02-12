var xlsx = require('node-xlsx');
var fs = require('fs');
const path = require('path');

var data = xlsx.parse("./数据处理源文件/" + "字母.xlsx");
var data1 = data[0].data;

var _list_1 = [];

var len = data1.length;
for (let i = 0; i < len; i ++) {
    let len2 = data1[i].length;
    for (let j = 0; j < len2; j ++) {
        if (i === 0) {
            _list_1[j] = {};
            _list_1[j]["ttl"]=data1[i][j];
            _list_1[j]["pic"]=data1[i][j];
        }
        if (i === 1) {
            _list_1[j]["description"]=data1[i][j];
        }
    }
}

for (let x = 0; x < _list_1.length; x ++) {
    _list_1[x]["cat"]='jiyi';
    _list_1[x]["keyword"]='字母';
}

// console.log(_prov);
// console.log('=======================');
// console.log(_list_1);
// return


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


// add(_list_1);


//---增-------------
function add(arr) {
    for (let i = 0; i < arr.length; i ++) {
        var  addSql = 'INSERT INTO db_pic(Id,ttl,cat,description,pic,keyword) VALUES(0,?,?,?,?,?)';
        var  addSqlParams = [arr[i].ttl,arr[i].cat,arr[i].description,arr[i].pic,arr[i].keyword];
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }        
        });
    }
}

connection.end();
