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

// from id 579
var _db = 'db_frontend';

/*-------------------------------------*/


var data = xlsx.parse("./数据处理源文件/" + "es6.xlsx");
var data1 = data[0].data;

var _list_1 = [];
var len = data1.length;
console.log(len);

addOne(0);
function addOne (i) {
    let _ttl = data1[i][0];
    let _audio = data1[i][1] || data1[i][0];
    let _des = data1[i][2];
    if (_ttl) {
      console.log(i);
      var $obj = {};
      $obj["ttl"]=_ttl;
      $obj["audio"]=_audio || '';
      $obj["pic"]=_ttl;
      $obj["description"]=_des || '';
      $obj["keyword"]='ES6';
      _list_1.push($obj);
      i ++;
      if (i < len) {
      // if (i < 16) {
        addOne(i);
      } else {
        console.log('end');
        // console.log(_list_1);
        addDb(0);
      }
    }
}


function addDb (_i) {
  var item = _list_1[_i];
  var  addSql = 'INSERT INTO '+_db+'(Id,ttl,pic,description,audio,keyword) VALUES(0,?,?,?,?,?)';
  var  addSqlParams = [item.ttl,item.pic,item.description,item.audio,item.keyword];
  connection.query(addSql,addSqlParams,function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       return;
      } 
      if (result) {
        console.log('add --- '+_i);
        _i ++;
        if (_i < len) {
          addDb(_i);
        } else {
          console.log('add finish');
        }   
      }
  });
}


//---增-------------
function add(item) {
    var  addSql = 'INSERT INTO '+_db+'(Id,ttl,pic,description,audio,keyword) VALUES(0,?,?,?,?,?)';
    var  addSqlParams = [item.ttl,item.pic,item.description,item.audio,item.keyword];
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

//---删-------------
function delCss() {
  // for (let i = 0; i < arr.length; i ++) {
    var delSql = 'DELETE FROM '+_db+' where keyword="css样式"';
    connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }  
    })
  // }
}

// connection.end();
