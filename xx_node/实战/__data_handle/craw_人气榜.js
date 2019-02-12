var fs = require('fs');
var http = require('https');

var _url = 'https://baike.baidu.com/api/starflower/starflowerstarlist?weekType=thisWeek&rankType=6&page=';
// var _url = 'https://baike.baidu.com/api/starflower/starflowerstarlist?weekType=thisWeek&rankType=10&page=';


var _maxPage = 8;
var num = 0;
getImg(1);

function getImg (_page) {
    let url = _url + _page;
    http.get(url, function(res) {
        var _data = '';
        res.on('data', function(data) {
            _data += data;
        });
        res.on('end', function() {
            if (_data) {
                var _rs = JSON.parse(_data).list;
                for (let j = 0; j < _rs.length; j ++) {
                    var _img = _rs[j].picUrl;
                    var _name = _rs[j].name;
                    loadImg(_img,__dirname+'/public/女明星_国外/美国/'+_name+'.jpg',function () {
                        num ++;
                        if (num >= _rs.length) {
                            console.log('----------------------');
                            console.log('第'+_page+'页：'+num+'张图片');  
                            if (_page  < _maxPage) {
                                num = 0;
                                _page ++;
                                getImg(_page);
                            }
                        }
                    })
                }
            }
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    });
}
    

// 下载图片
function loadImg (url,toDir,callback) {
    http.get(url, function(res){
        var imgData = "";
        res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
        res.on("data", function(chunk){
            imgData+=chunk;
        });
        res.on("end", function(){
            fs.writeFile(toDir, imgData, 'binary', function(err){
                if(err){
                    console.log("down fail");
                }
                console.log("down success");
                callback();
            });
        });
    });
}