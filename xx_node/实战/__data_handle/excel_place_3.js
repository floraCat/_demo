var xlsx = require('node-xlsx');
var fs = require('fs');
const path = require('path');

var data = xlsx.parse("./数据处理源文件/" + "省别称+车牌号+民族.xls");
var data_1 = data[0].data;
var data_2 = data[1].data;
var data_3 = data[2].data;

var _data_01 = [];
var _data_11 = [];
var _data_21 = [];
var _data_22 = [];
var _data_3 = [];

// 省别称
var len01 = data_1.length;
for (let i = 0; i < len01; i ++) {
    let _pre = data_1[i][0];
    let _item = '简称：'+data_1[i][1]+(data_1[i][2] || '');
    if (data_1[i][1]) {        
      var $obj = {};
      $obj["ttl"]=_pre;
      $obj["description"]=_item;
      _data_01.push($obj);
    }
}
var len11 = data_1.length;
for (let i = 0; i < len11; i ++) {
    let _item = data_1[i][1];
    let _des = '';
    if (data_1[i][2]) {
      _des = data_1[i][2] + " ### 所属省：" + data_1[i][0];
    } else {
      _des = '所属省：'+data_1[i][0];
    }
    if (_item) {        
      var $obj = {};
      $obj["ttl"]=_item;
      $obj["description"]=_des;
      $obj["keyword"]='省简称';
      _data_11.push($obj);
    }
}

// 车牌号
var len21 = data_2.length;
for (let i = 0; i < len21; i ++) {
    let _pre = data_2[i][1];
    let _item = data_2[i][0];
    if (_item) {        
      var $obj = {};
      $obj["ttl"]=_pre;
      $obj["description"]='车牌号：'+_item;
      _data_21.push($obj);
    }
}
var len23 = data_2.length;
for (let i = 0; i < len23; i ++) {
    let len24 = data_2[i].length;
    let _item = data_2[i][0];
    let _des = data_2[i][1];
    if (_item) {        
      var $obj = {};
      $obj["ttl"]=_item;
      $obj["relate"]='广东';
      $obj["description"]='所属：'+_des;
      $obj["keyword"]='车牌号';
      _data_22.push($obj);
    }
}

// 民族
var len31 = data_3.length;
for (let i = 0; i < len31; i ++) {
    let len32 = data_3[i].length;
    for (let j = 0; j < len32; j ++) {
      if (data_3[i][j]) {
        let $item=data_3[i][j].split('|')[0];
        let $des=data_3[i][j].split('|')[1] || '';
        if ($item) {        
          var $obj = {};
          $obj["ttl"]=$item;
          $obj["description"]=$des;
          $obj["keyword"]='民族';
          _data_3.push($obj);
        }
      }
    }
}


// console.log(_prov);
// console.log('=======================');
// console.log(_data_3);
// return


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


// add(_data_3);
return

//---增-------------
function add(arr) {
    for (let i = 0; i < arr.length; i ++) {
        var  addSql = 'INSERT INTO db_place(Id,ttl,description,keyword) VALUES(0,?,?,?)';
        var  addSqlParams = [arr[i].ttl,arr[i].description,arr[i].keyword];
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }        
        });
    }
}
//---查-------------
function view (ttl,callback) {
  var  sql = 'SELECT * FROM db_place WHERE ttl = "'+ttl+'"';
  connection.query(sql,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      callback(result);
  });
}
//---改-------------
function mod(arr) {
  for (let i = 0; i < arr.length; i ++) {
    view (arr[i].ttl,function (result) {
      var _des = arr[i].description;
      if (result[0].description) {
        _des = result[0].description+' ### '+arr[i].description;
      }
      var modSql = 'UPDATE db_place SET description = ? WHERE Id = ?';
      var modSqlParams = [_des,result[0].id];
      connection.query(modSql,modSqlParams,function (err, result) {
         if(err){
               console.log('[UPDATE ERROR] - ',err.message);
               return;
         }        
      });
    })
  }
}

connection.end();
