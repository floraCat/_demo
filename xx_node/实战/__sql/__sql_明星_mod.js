const fs = require('fs');
const path = require('path');
var http = require('http');


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


//---修改一个字段值-------------
const _url = 'http://localhost/_project/_my/notebook3/__data/index2.php?col=pic&tpl=vue_word&cat=def&grade=def&sort=oppCreat&play=def&keyword=%E5%A7%93%E6%B0%8F&catIn=true&gradeIn=true&kwIn=true&ttl=&description=&content=&timeStart_input=&timeEnd_input=&timeStart_update=&timeEnd_update=&audio=0&relate=&relateIn=true&act=list&pageNo=1&pageSize=200';

http.get(_url, function(res) {
    var _data = '';
    // 获取页面数据
    res.on('data', function(data) {
        _data += data;
    });
    // 数据获取结束
    res.on('end', function() {
    	console.log('-------');
    	let _arr = JSON.parse(_data).data.list;
    	for (let i = 0; i < _arr.length; i ++) {
    		_arr[i].level = '1';
    	}
    	// console.log(_arr);
    	mod(_arr)
    })
})	
return
//---增-------------
function add(arr) {
	for (let i = 0; i < arr.length; i ++) {
		var  addSql = 'INSERT INTO db_pic(Id,cat,ttl,description,pic,keyword,grade,level) VALUES(0,?,?,?,?,?,?,?)';
		var  addSqlParams = [arr[i].cat,arr[i].ttl,arr[i].description,arr[i].pic,arr[i].keyword,arr[i].grade,arr[i].level];
		connection.query(addSql,addSqlParams,function (err, result) {
		    if(err){
		     console.log('[INSERT ERROR] - ',err.message);
		     return;
		    }        
		});
		// fs.rename(arr[i].oldName,arr[i].newName,(err) => {
		// 	if (err) throw err;
		// })
	}
}
//---删-------------
function del(arr) {
	for (let i = 0; i < arr.length; i ++) {
		var delSql = 'DELETE FROM db_pic where ttl="'+arr[i].ttl+'"';
		connection.query(delSql,function (err, result) {
		    if(err){
		      console.log('[DELETE ERROR] - ',err.message);
		      return;
		    }  
		})
	}
}
//---查-------------
function view (ttl,callback) {
	var  sql = 'SELECT * FROM db_pic WHERE ttl = "'+ttl+'"';
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
			var modSql = 'UPDATE db_pic SET level = ? WHERE Id = ?';
			var modSqlParams = [arr[i].level,result[0].id];
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