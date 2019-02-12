var fs = require('fs');
var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var xlsx = require('node-xlsx');


var _url = 'https://123fans.cn/rank.php?c=1';
var _excel = [
    {
        name : '明星',
        data : []
    }
];

getImg();

function getImg () {
    let url = _url;
    https.get(url, function(res) {
        var html = '';
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            if (html) {
                var $ = cheerio.load(html);
                var _names = $(".ranking");
                
                _names.find('.odd').each(function(item) {
                    var _name = $(this);
                    var _name_txt = _name.find('.name').text();
                    var item = [
                        _name_txt
                    ];
                    _excel[0].data.push(item);
                });
                toExcel(_excel);
            }
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    });
}
    
function toExcel (_data) {
    var buffer = xlsx.build(_data);
    fs.writeFile('./明星.xls', buffer, function (err){
        if (err)
            throw err;
        console.log('Write to xls has finished');
        var obj = xlsx.parse("./" + "明星.xls");
        console.log(JSON.stringify(obj));
    });
}