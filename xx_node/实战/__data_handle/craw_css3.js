var fs = require('fs');
var http = require('http');
var cheerio = require('cheerio');
var xlsx = require('node-xlsx');

var data = [
    {
        name : 'sheet1',
        data : []
    },
    {
        name : 'sheet2',
        data : []
    }
]


var _url = 'http://t.mb5u.com/css3/d.htm';
// var _url = 'https://baike.baidu.com/api/starflower/starflowerstarlist?weekType=thisWeek&rankType=10&page=';


function getItems () {
    http.get(_url, function(res) {
        var _html = '';
        res.on('data', function(data) {
            _html += data;
        });
        res.on('end', function() {
            if (_html) {
                var $ = cheerio.load(_html);
                var _items = $(".linkcss3");
                var _len = _items.length;
                console.log(_len);
                var _ttls = [];
                var _dess = [];
                getOne(0);
                function getOne (_i) {
                    _i ++;
                    console.log(_i);
                    var css3 = $(_items[_i]);
                    var _txt = css3.text();
                    var _href = css3.attr("href");
                    _ttls.push([_txt]);
                    http.get('http://t.mb5u.com/css3/'+_href, function(res2) {
                        var _html2 = '';
                        res2.on('data',function(data2){
                            _html2 += data2;
                        });
                        res2.on('end', function() {
                            if (_html2) {
                                var $ = cheerio.load(_html2);
                                var _des = $("#intro").find('strong').text();
                                _dess.push([_des]);
                                if (_i < _len) {
                                    getOne(_i);
                                } else {
                                    console.log('ended');
                                    data[0].data = _ttls;
                                    data[1].data = _dess;
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


function toExl (_data) {
    var buffer = xlsx.build(_data);
    fs.writeFile('./数据处理源文件/resut.xlsx', buffer, function (err){
        if (err) throw err;
        console.log('Write to xlsx has finished');
    });
}
    