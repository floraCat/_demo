var fs = require("fs");     //添加fs模块
fs.readFile(__dirname + "/src/img.png",function(err,originBuffer){            //读取图片位置（路径）
    console.log(Buffer.isBuffer(originBuffer));

    fs.writeFile(__dirname + "/dist/img2.png",originBuffer,function(err){      //生成图片2(把buffer写入到图片文件)
        if (err) {
            console.log(err)
        }
        console.log('生成img2 ok')
    });

    // var base64Img = originBuffer.toString("base64");                //base64 图片编码

    // console.log(base64Img);

    // var decodeImg = new Buffer(base64Img,"base64")                  //new Buffer(string, encoding)

    // console.log(Buffer.compare(originBuffer,decodeImg));

    // fs.writeFile(__dirname + "dist/img3.png",decodeImg,function(err){        // 生成图片3(把base64位图片编码写入到图片文件)
    //     if (err) {
    //         console.log(err)
    //     }
    //     console.log('生成img3 base64位图片 ok')
    // })
})