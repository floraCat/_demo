var xlsx = require('node-xlsx');
var fs = require('fs');
const path = require('path');

var data = xlsx.parse("./数据处理源文件/" + "地桩.xlsx");
var data1 = data[1].data;

var _list_1 = [];
var _list_2 = [];
var _list_3 = [];
var _list_4 = [];
var _index = 0;

var len = data1.length;
for (let i = 0; i < len; i ++) {
    _index ++;

    let _item1 = data1[i][0];
    var $obj = {};
    $obj["ttl"]=_item1;
    $obj["cat"]='jiyi';
    $obj["description"]='身体';
    $obj["pic"]=_item1;
    $obj["keyword"]='地桩';
    $obj["sort"]=_index;
    _list_1.push($obj);

    let _item2 = data1[i][1];
    var $obj = {};
    $obj["ttl"]=_item2;
    $obj["cat"]='jiyi';
    $obj["description"]='花城汇';
    $obj["pic"]=_item2;
    $obj["keyword"]='地桩';
    $obj["sort"]=_index;
    _list_2.push($obj);

    let _item3 = data1[i][2];
    var $obj = {};
    $obj["ttl"]=_item3;
    $obj["cat"]='jiyi';
    $obj["description"]='家1';
    $obj["pic"]=_item3;
    $obj["keyword"]='地桩';
    $obj["sort"]=_index;
    _list_3.push($obj);

    let _item4 = data1[i][3];
    var $obj = {};
    $obj["ttl"]=_item4;
    $obj["cat"]='jiyi';
    $obj["description"]='校园1';
    $obj["pic"]=_item4;
    $obj["keyword"]='地桩';
    $obj["sort"]=_index;
    _list_4.push($obj);
}


// console.log(_prov);
// console.log('=======================');
// console.log(_list_1);
// console.log('--------------');
// console.log(_list_2);
// console.log('--------------');
// console.log(_list_3);
// console.log('--------------');
// console.log(_list_4);
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
// add(_list_2);
// add(_list_3);
// add(_list_4);


//---增-------------
function add(arr) {
    for (let i = 0; i < arr.length; i ++) {
        var  addSql = 'INSERT INTO db_pic(Id,ttl,cat,description,pic,keyword,sort) VALUES(0,?,?,?,?,?,?)';
        var  addSqlParams = [arr[i].ttl,arr[i].cat,arr[i].description,arr[i].pic,arr[i].keyword,arr[i].sort];
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }        
        });
    }
}

connection.end();
