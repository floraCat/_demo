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

var _url = 'http://localhost:8001/quicksearch.htm';

function getItems () {
    http.get(_url, function(res) {
        var _html = '';
        res.on('data', function(data) {
            _html += data;
        });
        res.on('end', function() {
            if (_html) {
                var $ = cheerio.load(_html);
                var _items = $(".g-list").find("a");
                var _len = _items.length;
                console.log(_len);
                getOne(0);
                function getOne (_i) {
                    console.log(_i);
                    data[0].data[_i] = [];
                    var _item = $(_items[_i]);
                    var _txt = _item.text();
                    _ttls.push(_txt);
                    data[0].data[_i].push(_txt);
                    var _type = '【css2】';
                    if (_item.attr('class') === 'g-color-css3-new') {
                        _type = '【css3】';
                    }   
                    data[0].data[_i].push(_type);
                    var _href = _item.attr("href");                 
                    http.get('http://localhost:8001/'+_href, function(res2) {
                        var _html2 = '';
                        res2.on('data',function(data2){
                            _html2 += data2;
                        });
                        res2.on('end', function() {
                            if (_html2) {
                                var $ = cheerio.load(_html2);
                                var _des = $("#intro").find('strong').text();
                                data[0].data[_i].push(_des);
                                _i ++;
                                if (_i < _len) {
                                // if (_i < 3) {
                                    getOne(_i);
                                } else {
                                    console.log('ended');
                                    var _old = getExl();
                                    for (let i = 0; i < _ttls.length; i ++) {
                                        for (let x = 0; x < _old.length; x ++) {
                                            if (_old[x][0] === _ttls[i]) {
                                                data[0].data[i].push(_old[x][1]);
                                            }
                                        }
                                    }
                                    // console.log(data[0].data);
                                    // toExl(data);
                                }
                            }
                        })
                    })
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
    fs.writeFile('./数据处理源文件/前端知识点2.xlsx', buffer, function (err){
        if (err) throw err;
        console.log('Write to xlsx has finished');
    });
}
    
