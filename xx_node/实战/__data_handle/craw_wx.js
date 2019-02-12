var fs = require('fs');
var https = require('https');
var cheerio = require('cheerio');
var xlsx = require('node-xlsx');

var data = [
    {
        name : 'sheet1',
        data : []
    }
]
var _ttls = [];

var _url = 'https://developers.weixin.qq.com/miniprogram/dev/api/';

function getItems () {
    https.get(_url, function(res) {
        var _html = '';
        res.on('data', function(data) {
            _html += data;
        });
        res.on('end', function() {
            if (_html) {
                var $ = cheerio.load(_html);
                var _items = $(".markdown-section").find('tbody').find('tr');
                var _len = _items.length;
                console.log(_len);
                getOne(0);
                function getOne (_i) {
                    console.log(_i);
                    var _item = $(_items[_i]).find('td');
                    
                    var _txt = $(_item[0]).find('a').text();
                    var _des = $(_item[1]).text();
                    data[0].data[_i] = [];
                    data[0].data[_i].push(_txt);
                    data[0].data[_i].push(_des);
                    _i ++;
                    if (_i < _len) {
                    // if (_i < 4) {
                        getOne(_i);
                    } else {
                        console.log('ended');
                        console.log(data[0].data);
                        toExl(data);
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
    // fs.writeFile('./数据处理源文件/wx.xlsx', buffer, function (err){
    fs.writeFile('./数据处理源文件/result.xlsx', buffer, function (err){
        if (err) throw err;
        console.log('Write to xlsx has finished');
    });
}
    
