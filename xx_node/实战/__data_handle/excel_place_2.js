var xlsx = require('node-xlsx');
var fs = require('fs');
const path = require('path');

var data = xlsx.parse("./数据处理源文件/" + "世界国家.xls");
var data2 = data[1].data;

var _country = [];
var _zhou = '';
var _zhou2 = '';
// console.log(data2);
//     return
var len = data2.length;
for (let i = 0; i < len; i ++) {
    let len2 = data2[i].length;
    // console.log(data2[0]);
    // return
    for (let j = 0; j < len2; j ++) {
      let _pre = data2[i][0];
      if (_pre) {
        if (_pre.indexOf('##') >= 0) {
          _zhou = _pre.substr(2);
        } else {
          _zhou2 = _pre.substring(0,_pre.length-1);
        }
      }
      let _item = data2[i][1];
      if (_item) {        
        var $obj = {};
        $obj["ttl"]=data2[i][1];
        $obj["description"]='';
        if (_item.indexOf('（') >= 0) {
          $obj["ttl"] = _item.split('（')[0];
          $obj["description"]='（'+_item.split('（')[1];
        }
        $obj["relate"]=_zhou+','+_zhou2;
        $obj["keyword"]='国家';
        _country.push($obj);
      }
    }
}

// console.log(_prov);
// console.log('=======================');
// console.log(_country);
// return


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


add(_country);


//---增-------------
function add(arr) {
    for (let i = 0; i < arr.length; i ++) {
        var  addSql = 'INSERT INTO db_place(Id,ttl,description,keyword,relate) VALUES(0,?,?,?,?)';
        var  addSqlParams = [arr[i].ttl,arr[i].description,arr[i].keyword,arr[i].relate];
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }        
        });
    }
}

connection.end();
