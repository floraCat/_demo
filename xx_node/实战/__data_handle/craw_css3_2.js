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


var _url = 'http://localhost:8000/css3.html';
// var _url = 'https://baike.baidu.com/api/starflower/starflowerstarlist?weekType=thisWeek&rankType=10&page=';

var _sameC = [];
var _sameN = [];

var _newC = [];
var _newN = [];


function getItems () {
    http.get(_url, function(res) {
        var _html = '';
        res.on('data', function(data) {
            _html += data;
        });
        res.on('end', function() {
            if (_html) {
                var $ = cheerio.load(_html);
                var _itemsC = $(".g-color-css3-change");
                var _itemsN = $(".g-color-css3-new");
                var _lenC = _itemsC.length;
                var _lenN = _itemsN.length;
                console.log(_lenC);
                console.log(_lenN);
                var _ttlsC = [];
                var _ttlsN = [];
                getOne(0);
                function getOne (_i) {
                    _i ++;
                    // console.log(_i);
                    var css3C = $(_itemsC[_i]);
                    var css3N = $(_itemsN[_i]);
                    var _txtC = css3C.text();
                    var _txtN = css3N.text();
                    if (_txtC) {_ttlsC.push(_txtC);}
                    if (_txtN) {_ttlsN.push(_txtN);}                    
                    if (_i < _lenN) {
                        getOne(_i);
                    } else {
                        console.log('ended');
                        var _old = getExl();

                        for (let i = 0; i < _ttlsC.length; i ++) {
                            let flagC = 0;
                            for (let x = 0; x < _old.length; x ++) {
                                if (_old[x][0] === _ttlsC[i]) {
                                    flagC = 1;
                                }
                            }
                            if (!flagC) {
                                _newC.push([_ttlsC[i]]);
                            }
                        }

                        for (let i = 0; i < _ttlsN.length; i ++) {
                            let flagN = 0;
                            for (let x = 0; x < _old.length; x ++) {
                                if (_old[x][0] === _ttlsN[i]) {
                                    flagN = 1;
                                }
                            }
                            if (!flagN) {
                                _newN.push([_ttlsN[i]]);
                            }
                        }
                        data[0].data = _newC;
                        data[1].data = _newN;
                        toExl(data);
                        console.log(_newC.length);
                        console.log(_newN.length);
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
    fs.writeFile('./数据处理源文件/resut.xlsx', buffer, function (err){
        if (err) throw err;
        console.log('Write to xlsx has finished');
    });
}
    
