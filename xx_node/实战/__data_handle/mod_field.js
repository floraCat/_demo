var xlsx = require('node-xlsx');
var fs = require('fs');
const path = require('path');

var _db = 'db_frontend';


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();



viewAll(function (res) {
  // res.length = 3;
  let _len = res.length;
  console.log(_len);
  for (var i = 0; i < _len; i ++) {
    if (res[i].level === '' || res[i].level === '-1') {
      res[i].level = '1'
    }
    if (res[i].grade === '' || 
        res[i].grade === '1' || 
        res[i].grade === 1 || 
        res[i].grade === 0 ||
        res[i].grade === null
    ) {
      res[i].grade = '2'
    }
  }
  // console.log(res);
  // mod(res)
});



//---查全部-------------
function viewAll (callback) {
  var  sql = 'SELECT * FROM '+_db+'';
  connection.query(sql,function (err, result) {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
      callback(result);
  });
}

//---改-------------
function mod(_arr) {
  for (let i = 0; i < _arr.length; i ++) {
    var modSql = 'UPDATE '+_db+' SET level = ?,grade = ? WHERE Id = ?';
    var modSqlParams = [_arr[i].level,_arr[i].grade,_arr[i].id];
    connection.query(modSql,modSqlParams,function (err, result) {
       if(err){
             console.log('[UPDATE ERROR] - ',err.message);
             return;
       }        
    });
  }
}

// connection.end();
