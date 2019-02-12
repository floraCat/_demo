var fs = require('fs');
var http = require('https');
var cheerio = require('cheerio');

var _arr = [
    "赵丽颖",
    "杨幂",
    "鹿晗"
]
// encodeURI


// var url = 'https://baike.baidu.com/item/%E8%B5%B5%E4%B8%BD%E9%A2%96';
var _url = 'https://baike.baidu.com/item/';


getImg();

function getImg () {
    let _cur = _arr.shift();
    let url = _url + encodeURI(_cur);
    http.get(url, function(res) {
        var html = '';
        // 获取页面数据
        res.on('data', function(data) {
            html += data;
        });
        res.on('end', function() {
            if (html) {
                var $ = cheerio.load(html);
                // var _img = $('.hotspotminingContent_pic img').attr("src");
                var _img = $(".lemmaWgt-secondsKnow-gallery li").eq(0).find("img").attr("src");
                console.log(_img);
                // return;
                uploadImg(_img,__dirname+'/'+_cur+'.png',function () {
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
    


function uploadImg (url,toDir,callback) {
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