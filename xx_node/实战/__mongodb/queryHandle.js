var dbHandle = require('./dbHandle');

function queryHandle (collection,req,res) {
	if (req.query.act === 'list') { dbHandle.list(collection,req,res);}
	if (req.query.act === 'add') { dbHandle.add(collection,req,res);}
	if (req.query.act === 'mod') { dbHandle.mod(collection,req,res);}
	if (req.query.act === 'del') { dbHandle.del(collection,req,res);}
}
module.exports = queryHandle;