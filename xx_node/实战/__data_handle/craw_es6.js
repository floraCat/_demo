var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var xlsx = require('node-xlsx');

var data = [
    {
        name : 'sheet1',
        data : []
    }
]
var _ttls = [];

var _url = 'http://caibaojian.com/es6/let.html';

function getItems () {
    http.get(_url, function(res) {
        var _html = '';
        res.on('data', function(data) {
            _html += data;
        });
        res.on('end', function() {
            if (_html) {
                var $ = cheerio.load(_html);
                var _items = $(".summary").children('.chapter ');
                // var _len = _items.length;
                var _len = 23;
                console.log(_len);
                getOne(2);
                function getOne (_i) {
                    // console.log(_i);
                    var _item = $(_items[_i]).find("a");
                    _i ++;
                    var _txt = _item.text();
                    var _href = _item.attr("href"); 
                    if (_item && _href != 'caibaojian.com' && _href != 'http://caibaojian.com/book/') {
                        http.get('http://caibaojian.com/es6/'+_href, function(res2) {
                            var _html2 = '';
                            res2.on('data',function(data2){
                                _html2 += data2;
                            });
                            res2.on('end', function() {
                                if (_html2) {
                                    var $ = cheerio.load(_html2);
                                    console.log($(_items[_i]).text().trim());
                                    var _ttls = $(".markdown-section").find('h2');
                                    var _subs = $(".markdown-section").find('h3');
                                    var _subs2 = $(".markdown-section").find('strong');
                                    var _subTxts = []
                                    var _subTxts2 = []
                                    for (let y = 0; y < _subs.length; y ++) {
                                        _subTxts.push($(_subs[y]).text());
                                    }
                                    for (let y = 0; y < _subs2.length; y ++) {
                                        _subTxts2.push($(_subs2[y]).text());
                                    }
                                    for (let x = 0; x < _ttls.length; x ++) {
                                        let _temp = [
                                            $(_ttls[x]).text(),
                                            _subTxts.join('~~~'),
                                            _subTxts2.join('~~~')
                                        ]
                                        data[0].data.push(_temp);
                                    }
                                    if (_i < _len) {
                                    // if (_i < 4) {
                                        getOne(_i);
                                    } else {
                                        console.log('ended');
                                        console.log(data[0].data.length);
                                        // toExl(data);
                                    }
                                }
                            })
                        })
                    }
                }
            }
        })
    })
}
getItems();
return;


function getExl() {
    var obj = xlsx.parse("./数据处理源文件/" + "前端知识点.xlsx");
    let _rs = JSON.parse(JSON.stringify(obj));
    return _rs[2].data;
}


function toExl (_data) {
    var buffer = xlsx.build(_data);
    // fs.writeFile('./数据处理源文件/es6.xlsx', buffer, function (err){
    fs.writeFile('./数据处理源文件/result.xlsx', buffer, function (err){
        if (err) throw err;
        console.log('Write to xlsx has finished');
    });
}
    
