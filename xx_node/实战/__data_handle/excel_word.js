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


var _db = 'db_word';
var _db2 = 'db_training';

/*-------------------------------------*/


var data = xlsx.parse("./数据处理源文件/" + "_word.xlsx");


let _list = [];
fieldOne(0);

function fieldOne (x) {
    let _data = data[x].data;
    let _len = _data.length;
    console.log('======================len='+_len);
    addOne(x,_data,0)
}

function addOne (_x,_data,i) {
    let _ttl = _data[i] && _data[i][0];
    let _kw = _data[i] && _data[i][1];
    let _cat='';
    switch(_x) {
      case 0:
        _cat = 'chengyu';
        break;
      case 1:
        _cat = 'suyu';
        break;
      case 2:
        _cat = 'yongci';
        break;
      case 3:
        _cat = 'cankao';
        break;
      case 4:
        _cat = 'biyu';
        break;
      case 5:
        _cat = 'zhuci';
        break;
      case 6:
        _cat = 'shuyu';
        break;
      case 7:
        _cat = 'qita';
        break;
    }
    if (_ttl) {
      console.log(_ttl);
      var $obj = {};
      $obj["level"]='1';
      $obj["grade"]='2';
      $obj["ttl"]=_ttl;
      $obj["audio"]='ttl';
      $obj["cat"]=_cat;
      $obj["keyword"] = '';
      if (_kw) {
        $obj["keyword"]=_kw;
      }
      _list.push($obj);
      dbHandle();
    } else {
      dbHandle();
    }
    function dbHandle () {
      let _len = _data.length
      i ++;
      if (i < _len) {
        addOne(_x,_data,i);
      } else {
        console.log(_list);
        console.log(_cat+' end--------');
        if (_x<= 1) {
          $db = _db;
        } else {
          $db = _db2;
        }
        addDb(_list,0,$db,function () {
          _x ++;
          if (_x < 8) {
            fieldOne(_x)
          } else {
            console.log('finished ...');
          }
        });
      }
    }
}


function addDb (_items,_i,$db,callback) {
  var _len = _items.length
  if (_len > 0) {
    var item = _items[_i];
      var  addSql = 'INSERT INTO '+$db+'(Id,cat,ttl,level,grade,audio,keyword) VALUES(0,?,?,?,?,?,?)';
      var  addSqlParams = [item.cat,item.ttl,item.level,item.grade,item.audio,item.keyword];
      connection.query(addSql,addSqlParams,function (err, result) {
          if(err){
           console.log('[INSERT ERROR] - ',err.message);
           return;
          } 
          if (result) {
            _i ++;
            if (_i < _len) {
              addDb(_items,_i,$db,callback);
            } else {
              _list = [];
              callback();
            }   
          }
      });
  } else {
    _list = [];
    callback();
  }
}
