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


//---把人物图添加到db_pic-------------
// const url = 'D:/_phpStudy/WWW/_project/_my/notebook3_pics/人物/未分类/';
// let arr = [];
// fs.readdir(url, 'utf8', (err, files) => {
// 	if (err) throw err;
// 	files.forEach((item,index) => {
// 		let type = '.' + item.split('.')[1];
// 		let name = item.split('.')[0];
// 		let name2 = name.split(' - ')[0];
// 		let des = name.split(' - ')[1];
// 		let _obj = {
// 			oldName: url+item,
// 			newName: url+name2+type,
// 			cat: 'renwu',
// 			ttl: name2,
// 			description: des,
// 			content: '/人物/名人/'+name2+type,
// 			keyword: '',
// 			grade: 3
// 		}
// 		arr.push(_obj);
// 	});
// 	// add(arr);
// 	// del(arr);
// 	// mod(arr);
// });

//---把景点图添加到db_pic-------------
// const url = 'D:/_phpStudy/WWW/_project/_my/notebook3_pics/旅游2/世界排名/';
// let arr = [];
// fs.readdir(url, 'utf8', (err, files) => {
// 	if (err) throw err;
// 	files.forEach((item,index) => {
// 		let type = '.' + item.split('.')[1];
// 		let name = item.split('.')[0];
// 		let name2 = name.split('-')[0];
// 		let des = name.split('-')[1];
// 		let _obj = {
// 			oldName: url+item,
// 			newName: url+name2+type,
// 			cat: 'lvyou',
// 			ttl: name2,
// 			description: des,
// 			content: '/旅游/景点/'+name2+type,
// 			keyword: '景点,国外',
// 			grade: 2,
// 			level: 0
// 		}
// 		arr.push(_obj);
// 	});
// 	// add(arr);
// 	// del(arr);
// 	// mod(arr);
// });


//---把企业图添加到db_pic-------------
// const url = 'D:/_phpStudy/WWW/_project/_my/notebook3_pics/__品牌/';
// const urlTo = 'D:/_phpStudy/WWW/_project/_my/notebook3_pics/品牌/互联网/';
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
// 					cat: 'pinpai',
// 					ttl: name,
// 					description: '',
// 					content: '/品牌/互联网/'+name+type,
// 					keyword: '',
// 					grade: 2,
// 					level: 2,
// 					relate: _relate
// 				}
// 				arr.push(_obj);
// 				fs.readFile(_url + file,function(err,originBuffer){
// 					fs.writeFile(urlTo + file,originBuffer,function(err){
// 						if (err) throw err;
// 					})
// 				})
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


//---把其他图添加到db_pic-------------
const url = 'D:/_phpStudy/WWW/_project/_my/notebook3_pics/logo/';
let arr = [];
function read(dirArr) {
	let _url = url + dirArr.join('/') + '/';
	fs.readdir(_url, 'utf8', (err, files) => {
		if (err) throw err;
		files.forEach((file,index) => {
			let url2 = _url+file+'/';
			if (fs.statSync(url2).isDirectory()) {
				let dirArr2 = JSON.parse(JSON.stringify(dirArr));
				dirArr2.push(file);
				read(dirArr2); // 递归
			} else {
				let type = '.' + file.split('.')[1];
				let name = file.split('.')[0];
				let _relate = dirArr.join(',');
				if (dirArr.length > 0) {
					let _lastDir = dirArr[dirArr.length-1];
					if (name === _lastDir) {
						var _arr = [];
						if (dirArr.length > 1) {
							for (var i = 0; i < dirArr.length-1; i ++) {
								_arr.push(dirArr[i]);
							}
						}
						files.forEach((_file,_index)=>{
							let _url9 = _url+_file+'/';
							if (!fs.statSync(_url9).isDirectory()) {
								let _name = _file.split('.')[0];
								if (_name === _lastDir) {} else {
									_arr.push(_name);
								}
							}
						});
						_relate = _arr.join(',');
					}
				}				
				let _obj = {
					// oldName: url+name+type,
					// newName: url+name.substr(-2)+type,
					cat: 'pinpai',
					ttl: name,
					description: '',
					content: '/品牌/房地产/'+name+type,
					keyword: '房地产',
					grade: 2,
					level: '1',
					relate: _relate
				}
				arr.push(_obj);
			}				
		});	
	});
}
read([])
setTimeout(function () {
	// console.log(arr);
	// add(arr);
	// del(arr);
	// mod(arr);
}, 5000);	
return
//---增-------------
function add(arr) {
	for (let i = 0; i < arr.length; i ++) {
		var  addSql = 'INSERT INTO db_pic(Id,cat,ttl,description,content,keyword,grade,level,relate) VALUES(0,?,?,?,?,?,?,?,?)';
		var  addSqlParams = [arr[i].cat,arr[i].ttl,arr[i].description,arr[i].content,arr[i].keyword,arr[i].grade,arr[i].level,arr[i].relate];
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