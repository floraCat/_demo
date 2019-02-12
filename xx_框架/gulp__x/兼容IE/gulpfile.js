
/*
	for兼容测试：(意在测试不支持LESS的IE8以下浏览器)
	---截取html内的style代码 - [ layout START 和 layout END 之间 ]
	---放到新*_gulp.less文件内；
	---gulp任务把此less文件编译成*_gulp.css；
	---html插入调用此外部css的代码；
	---最后把*_gulp.css内@import的样式去掉；
*/

function handleFile(baseUrl,filename){
	var htmlFile=baseUrl+filename+".html";          
	var htmlFile_new=baseUrl+filename+"_gulp.html";       
	var lessFile=baseUrl+filename+"_gulp.less";          
	var rf=require("fs");  
	var data=rf.readFileSync(htmlFile,"utf-8"); //被打开文件的内容
	var aaa=data.indexOf("/*layout*/"); 
	var bbb=data.indexOf("/*layout END*/"); 
	var substr_=bbb-aaa+14;
	var ccc=data.substr(aaa,substr_); //截取style代码
	
	all_before=data.substr(0,aaa-26);
	all_after=data.substr(eval(bbb+24),data.length-bbb-24);
	all_=all_before+'<link type="text/css" rel="stylesheet" href="'+filename+'_gulp.css" />'+all_after; //插入代码
	
	rf.writeFile(htmlFile_new,all_,function(){
		console.log("插入成功");
	});
	rf.writeFile(lessFile,ccc,function(){ //style放新建的less内
		console.log("新生成less文件成功");
	});
}  

var baseUrl="D:/AppServ/www/000/web/"; //路径前缀
var filename="_save_by_file_for_mode"; //html文件名
var cssFile=baseUrl+filename+"_gulp.css"; //html文件名
handleFile(baseUrl,filename);
	

function handleCss(cssFile){
	var cssF=require('fs');
	var data=cssF.readFileSync(cssFile,"utf-8");
	var aaa=data.indexOf("/*layout START*/"); 
	var bbb=data.indexOf("/*layout END*/"); 
	var substr_=bbb-aaa-16;
	var ccc=data.substr(aaa+16,substr_); //除去@import的样式
	cssF.writeFile(cssFile,ccc,function(){
		console.log("删减样式成功");
	});
}



var gulp = require('gulp');
    less = require('gulp-less');
//以上可以每句末尾加；

// Styles任务
gulp.task('one', function() {
    return gulp.src(baseUrl+filename+"_gulp.less")
    .pipe(less())
    .pipe(gulp.dest(baseUrl))
});


gulp.task('default', ['one'],function(){
		
	handleCss(cssFile);
		
		
});
