var xlsx = require('node-xlsx');
var fs = require('fs');
const path = require('path');

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


var _db = 'db_matter';

/*-------------------------------------*/


var _txt = fs.readFileSync('./tpl_matter_to_sql.js','utf8');

let _arr = _txt.split('####################################################');
let _len = _arr.length;
let _list = [];

addOne(0);

function addOne (i) {
    let _ttl = _arr[i].split('~~~')[0].trim();
    let _desc = _arr[i].split('~~~')[1].trim();
    if (_ttl) {
      var $obj = {};
      $obj["level"]='1';
      $obj["grade"]='2';
      $obj["ttl"]=_ttl;
      $obj["audio"]='desc';
      $obj["cat"]='lunju';
      $obj["description"] = _desc || '';
      _list.push($obj);
      i ++;
      if (i < _len) {
        addOne(i);
      } else {
        console.log('end--------');
        console.log(_list);
        addDb(0);
      }
    }
}


function addDb (_i) {
  if (_len > 0) {
    var item = _list[_i];
      var  addSql = 'INSERT INTO '+_db+'(Id,cat,ttl,level,grade,audio,description) VALUES(0,?,?,?,?,?,?)';
      var  addSqlParams = [item.cat,item.ttl,item.level,item.grade,item.audio,item.description];
      connection.query(addSql,addSqlParams,function (err, result) {
          if(err){
           console.log('[INSERT ERROR] - ',err.message);
           return;
          } 
          if (result) {
            _i ++;
            if (_i < _len) {
              addDb(_i);
            }  
          }
      });
  } else {
    console.log('没有数据要保存');
  }
}
