var fs= require("fs");
var path = require('path');
var opn = require('opn');
var express = require('express');
var bodyParser     =         require("body-parser"); 
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.set('port',8055);

app.get('/', function(req, res) {
   res.send('Hello World');
});


app.get('/getAPI', function (req, res) {
    var _apis = fs.readFileSync('../../../../_project/14_xiaoxiang/vue-admin-local/client/assets/_api/index.js','utf8');
    var _x1 = _apis.split('// API.xxxx');
    var _x2 = _x1[0].split("API.suf = '';");
    var _xx = _x2[1];
    var _reg = /{[\s\S]*?};/g;
    var _match = _xx.match(_reg);
    var _arr = [];
    _match.forEach(function (val) {
        var _obj = strToObj(val).trim();
        _obj = _obj.substr(0,_obj.length-1);
        _obj = _obj.replace(/\'/g,'"');
        _arr.push(JSON.parse(_obj));
    });
    function strToObj (_str) {
        var _reg = /(\w+?):\s/g;
        _str.replace(_reg,function () {
            var _arg = arguments;
            _str = _str.replace(eval("/(?<![\"])"+_arg[1]+"(?=:)/"),'"'+_arg[1]+'"');
        })
        return _str;
    }
    // return
    
    res.send(_arr);
})


// 删除所有文件
app.post('/delAll', function (req, res) {
	var _filePre = '../../../../_project/14_xiaoxiang/vue-admin-local/client/assets/_api/json';
    deleteFolder(_filePre);
    res.send('delect all files is ok');
    function deleteFolder(path) {
        var files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) {
                    deleteFolder(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }
});

// 逐个生成文件
app.post('/download', function(req, res) {
    var _path = req.body.path;
    console.log('===='+_path);
    var _data = req.body.res;
    var _filePre = '../../../../_project/14_xiaoxiang/vue-admin-local/client/assets/_api/json/';
    var mkFile = function () {
    	return new Promise(function (resolve,reject) {
		    if( !fs.existsSync(_filePre) ) {
		    	fs.mkdir(_filePre,0777,function (err) {
					if (err) {
					    console.log(err);
					    return
					}
				});
		    }
		    resolve();
    	});
    }
    mkFile().then(function () {
    	handle()
    });
    function handle () {
    	if (_path.indexOf('/') >= 0) {
            var _filePre2 = _filePre;
			var _pathArr = _path.split('/');
			addDir(0);
			function addDir (index) {
                if (!fs.existsSync(_filePre2+_pathArr[index])) {
                    fs.mkdirSync(_filePre2+_pathArr[index],0777,function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                } 
                _filePre2 = _filePre2+_pathArr[index]+'/';
                if (index < _pathArr.length - 2) {
                    index ++;
                    addDir(index);
                } else {
                    add();
                }
			}
		} else {
			add();
		}
    }
    function add () {
    	fs.writeFile(_filePre+_path+'.json',_data,function(err){
	        if (err) {
	            console.log(err)
	        }
	        console.log(_path + ' 生成 ok')
	    });
    }
    res.send('download '+_path+' is ok');
});


app.use(express.static(path.join(__dirname,'./')));
app.listen(app.get('port'));

opn('http://localhost:8055/index.html')


