var fs = require('fs');
var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var xlsx = require('node-xlsx');


// var _url = 'http://www.en8848.com.cn/words/basic/1200danci/';
var _url = 'http://www.en8848.com.cn/words/basic/1200danci/index_2.html';
var _arr = [];
var _listLen = 1000;
var _curIndex = 0;

getImg();

function getImg () {
    let url = _url;
    http.get(url, function(res) {
        var html = '';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            if (html) {
                var $ = cheerio.load(html);
                var _links = $(".ch_content");
                _listLen = _links.find('.ch_lii').length;
                console.log(_listLen);
                _listLen = 15;
                _curIndex = 14;
                _links.find('.ch_lii').each(function(item) {
                    if ((item+1) > 14 && (item+1) < 16) {
                        var _link = $(this);
                        var _href = _link.find('a').attr("href");
                        http.get(_href, function(res) {
                            var html2 = '';
                            res.on('data', function(data) {
                                html2 += data;
                            });
                            res.on('end', function() {
                                if (html2) {
                                    var $ = cheerio.load(html2);
                                    var _div = $(".info-qh").text();
                                    // var _div = $(".jxa_content").text();
                                    _div = _div.substr(_div.indexOf("(mp3)")+5).split('\n');
                                    // console.log('------------');
                                    var _index8 = 0;
                                    for (let j = 0; j < _div.length; j ++) {
                                        if (_div[j].trim()) {
                                            _index8 ++
                                            var _obj = {};
                                            _obj["ttl"] = _div[j].split('[')[0].trim();
                                            var _rt = _div[j].split('[')[1];
                                            // console.log(_rt);
                                            _obj["pin"] = '['+_rt.split(']')[0].trim()+']';
                                            _obj["description"] = _rt.split(']')[1] ? _rt.split(']')[1].trim() : "";
                                            _obj["audio"] = 'ttl';
                                            _arr.push(_obj);
                                        }
                                    }
                                    _curIndex ++;
                                    console.log("------第"+_curIndex+"页-----------");
                                    console.log(_div);
                                    console.log(_index8+'条');
                                }
                            })
                        })
                    }
                })
            }
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    });
}
    

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'notebook'
});
 
connection.connect();


var setIn = setInterval(function () {
    if (_curIndex >= _listLen) {
        console.log('===========');
        console.log(_arr.length);
        // add(_arr);
        clearInterval(setIn);
        return
    }
}, 1000);
// add(_arr);


//---增-------------
function add(arr) {
    for (let i = 0; i < arr.length; i ++) {
        var  addSql = 'INSERT INTO db_english(Id,ttl,pin,description,audio) VALUES(0,?,?,?,?)';
        var  addSqlParams = [arr[i].ttl,arr[i].pin,arr[i].description,arr[i].audio];
        connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return;
            }        
        });
    }
}

// connection.end();