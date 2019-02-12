const fs = require('fs');
const path = require('path');


var mysql      = require('mysql');
var _params = {
  host     : '39.108.50.253',
  user     : 'root',
  password : 'root123',
  database : 'sq_notebook3',
  port     : '3306'
}
var connection = mysql.createConnection(_params);
 
connection.connect();


var  sql = 'SELECT * FROM data_card_top';
connection.query(sql,function (err, result) {
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      connect();
      return;
    }
    console.log('sql_test');
    console.log(result)
});



function handleError(err) {
    if (err) {
        // 如果是连接异常，自动重新连接
        console.log('err code:' + err.code);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR' || err.code === 'ETIMEDOUT') {
            connect();
        } else {
            console.error(err.stack || err);
        }
    }
}

function connect() {
    connection = mysql.createConnection(_params);
    connection.connect(handleError);
    connection.on('error', handleError);
}

connection.end();