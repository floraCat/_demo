var fs = require('fs');
var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var xlsx = require('node-xlsx');

var data = xlsx.parse("./数据处理源文件/" + "男明星.xls");

var _arr = data[0].data;
// var url = 'http://www.baidu.com/s?wd=%E8%B5%B5%E4%B8%BD%E9%A2%96';
var _url = 'http://www.baidu.com/s?wd=';

getImg();

function getImg () {
    let _cur = _arr.shift();
    let url = _url + encodeURI(_cur[0]);
    http.get(url, function(res) {
        var html = '';
        // 获取页面数据
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            if (html) {
                var $ = cheerio.load(html);
                var _img = $(".op-bk-polysemy-album").find("img").attr("src");
                var _replace = _img.substr(0,_img.indexOf('.com/')+4);
                var _pre = 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq';
                var _src = _img.replace(_replace,_pre);
                console.log(_src);

                loadImg(_src,__dirname+'/public/男明星/'+_cur+'.jpg',function () {
                    if (_arr.length > 0) {
                        getImg();
                    } else {
                        console.log('下载完毕');
                    }
                })                
            }
        });
    }).on('error', function() {
        console.log('获取数据出错！');
    });
}
    

// 下载图片
function loadImg (url,toDir,callback) {
    https.get(url, function(res){
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
