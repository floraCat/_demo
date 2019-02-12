const fs = require('fs');
const path = require('path');


var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


//---把企业图添加到db_pic-------------
const url = 'D:/_phpStudy/WWW/_demo/xx_node/实战/node1/public/女明星/';
const urlTo = 'D:/_phpStudy/WWW/_project/_my/notebook3_static/人物/明星/';
let arr = [];
function read() {
	fs.readdir(url, 'utf8', (err, files) => {
		if (err) throw err;
		files.forEach((file,index) => {
			let name = file.split('.')[0];
			let _obj = {
				cat: 'renwu',
				ttl: name,
				description: '国内大陆',
				pic: '/人物/明星/'+file,
				keyword: '明星,国内,女',
				grade: 2,
				level: 1
			}
			arr.push(_obj);
			fs.readFile(url + file,function(err,originBuffer){
				fs.writeFile(urlTo + file,originBuffer,function(err){
					if (err) throw err;
				})
			})
		});	
	});
}
read()
setTimeout(function () {
	// console.log(arr);
	// add(arr);
	// del(arr);
	// mod(arr);
}, 5000);


//---把其他图添加到db_pic-------------
// const url = 'D:/_phpStudy/WWW/_project/_my/notebook3_pics/logo/';
// let arr = [];
// function read(dirArr) {
// 	let _url = url + dirArr.join('/') + '/';
// 	fs.readdir(_url, 'utf8', (err, files) => {
// 		if (err) throw err;
// 		files.forEach((file,index) => {
// 			let url2 = _url+file+'/';
// 			if (fs.statSync(url2).isDirectory()) {
// 				let dirArr2 = JSON.parse(JSON.stringify(dirArr));
// 				dirArr2.push(file);
// 				read(dirArr2); // 递归
// 			} else {
// 				let type = '.' + file.split('.')[1];
// 				let name = file.split('.')[0];
// 				let _relate = dirArr.join(',');
// 				if (dirArr.length > 0) {
// 					let _lastDir = dirArr[dirArr.length-1];
// 					if (name === _lastDir) {
// 						var _arr = [];
// 						if (dirArr.length > 1) {
// 							for (var i = 0; i < dirArr.length-1; i ++) {
// 								_arr.push(dirArr[i]);
// 							}
// 						}
// 						files.forEach((_file,_index)=>{
// 							let _url9 = _url+_file+'/';
// 							if (!fs.statSync(_url9).isDirectory()) {
// 								let _name = _file.split('.')[0];
// 								if (_name === _lastDir) {} else {
// 									_arr.push(_name);
// 								}
// 							}
// 						});
// 						_relate = _arr.join(',');
// 					}
// 				}				
// 				let _obj = {
// 					// oldName: url+name+type,
// 					// newName: url+name.substr(-2)+type,
// 					cat: 'pinpai',
// 					ttl: name,
// 					description: '',
// 					content: '/品牌/房地产/'+name+type,
// 					keyword: '房地产',
// 					grade: 2,
// 					level: '1',
// 					relate: _relate
// 				}
// 				arr.push(_obj);
// 			}				
// 		});	
// 	});
// }
// read([])
// setTimeout(function () {
// 	// console.log(arr);
// 	// add(arr);
// 	// del(arr);
// 	// mod(arr);
// }, 5000);	
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
			var modSql = 'UPDATE db_pic SET pic = ? WHERE Id = ?';
			var modSqlParams = [arr[i].pic,result[0].id];
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