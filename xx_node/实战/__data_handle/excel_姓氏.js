var xlsx = require('node-xlsx');
var fs = require('fs');
const path = require('path');

var data = xlsx.parse("./数据处理源文件/" + "姓氏.xlsx");
var data1 = data[0].data;
var data2 = data[1].data;

var _list_1 = [];
var _list_2 = [];

var _db = 'db_pic';

// var len = data1.length;
// for (let i = 0; i < len; i ++) {
//     let _item = data1[i][0];
//     let _ttl = _item.split('——')[0];
//     let _des = _item.split('——')[1];
//     var $obj = {};
//     $obj["ttl"]=_ttl;
//     $obj["cat"]='jiyi';
//     $obj["description"]=_des;
//     $obj["pic"]=_ttl;
//     $obj["keyword"]='姓氏';
//     _list_1.push($obj);
// }

var len = data2.length;
for (let i = 0; i < len; i ++) {
    let _ttl = data2[i][0];
    let _level = data2[i][2].toString();
    let _des = data2[i][1];
    var $obj = {};
    $obj["ttl"]=_ttl;
    $obj["cat"]='jiyi';
    $obj["description"]=_des || '';
    $obj["level"]=_level;
    $obj["pic"]=_ttl;
    $obj["keyword"]='姓氏';
    _list_2.push($obj);
}



// console.log(_prov);
// console.log('=======================');
console.log(_list_2);
return


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


// add(_list_1);

// for (let j = 0; j < _list_2.length; j ++) {
//     // 数据库有就mod，没有就add
//     view(_list_2[j].ttl,function (res) {
//         mod(_list_2[j],res[0].id);
//     },function () {
//         add(_list_2[j]);
//     });
// }


//---增-------------
function add(item) {
    var  addSql = 'INSERT INTO '+_db+'(Id,ttl,cat,description,level,pic,keyword) VALUES(0,?,?,?,?,?,?)';
    var  addSqlParams = [item.ttl,item.cat,item.description,item.level,item.pic,item.keyword];
    connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
    });
}
//---查-------------
function view (ttl,callMod,callAdd) {
  var  sql = 'SELECT * FROM '+_db+' WHERE ttl = "'+ttl+'"';
  connection.query(sql,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      if (result.length > 0) {
        callMod(result);
      } else {
        callAdd();
      }
      
  });
}
//---改-------------
function mod(item,id) {
    var modSql = 'UPDATE '+_db+' SET level = ? WHERE Id = ?';
    var modSqlParams = [item.level,id];
    connection.query(modSql,modSqlParams,function (err, result) {
       if(err){
             console.log('[UPDATE ERROR] - ',err.message);
             return;
       }        
    });
}

// connection.end();
