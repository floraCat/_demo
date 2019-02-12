var MongoClient = require('mongodb').MongoClient;

var $url = 'mongodb://localhost:27017/';
var $db = 'test1';

// 查询
function list(collection,req,res) {
	MongoClient.connect($url,{useNewUrlParser:true},function (err,db) {
		if (err) throw err;
		var dbo = db.db($db);
		dbo.collection(collection).find().toArray(function (err,result) {
			if (err) throw err;
			console.log('list seccess');
			res.send(result);
			db.close();
		});
	});
}

// 添加
function add(collection,req,res) {
	MongoClient.connect($url,{useNewUrlParser:true},function (err,db) {
		if (err) throw err;
		var dbo = db.db($db);
		var addObj = {
			name: req.query.name
		}
		dbo.collection(collection).insertOne(addObj,function (err,result) {
			if (err) throw err;
			console.log('add seccess');
			res.send(result);
			db.close();
		});
	});
}

// 修改
function mod(collection,req,res) {
	MongoClient.connect($url,{useNewUrlParser:true},function (err,db) {
		if (err) throw err;
		var dbo = db.db($db);
		var whereObj = {name: req.query.name};
		var updateObj = {
			$set: {
				ttl: req.query.ttl
			}
		}
		dbo.collection(collection).updateOne(whereObj,updateObj,function (err,result) {
			if (err) throw err;
			console.log('mod seccess');
			res.send(result);
			db.close();
		});
	});
}

// 删除
function del(collection,req,res) {
	MongoClient.connect($url,{useNewUrlParser:true},function (err,db) {
		if (err) throw err;
		var dbo = db.db($db);
		var whereObj = {name: req.query.name};
		dbo.collection(collection).deleteOne(whereObj,function (err,result) {
			if (err) throw err;
			console.log('del seccess');
			res.send(result);
			db.close();
		});
	});
}

module.exports = {
	list: list,
	add : add,
	mod : mod,
	del : del
};