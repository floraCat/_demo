var admZip = require('adm-zip');
var fs = require('fs');
var xlsx = require('node-xlsx');


const zip = new admZip('__word文档/做计划.docx');
//将该docx解压到指定文件夹result下
zip.extractAllTo("./result", true);
