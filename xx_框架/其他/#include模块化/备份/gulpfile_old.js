var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var requirejsOptimize=require('gulp-requirejs-optimize');


// 压缩图片
gulp.task('images', function() {
    return gulp.src('resource_pre/images/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('resource/images'))
});


// less解析为css
gulp.task('less', function() {
    return gulp.src('app/less/common.less')
    .pipe(less())
    .pipe(gulp.dest('app/css'))
});

//去掉/less/base/中.less被解析的样式
gulp.task('less2',['less'],function(){
	var file='app/css/common.css'
	var fs=require('fs');
	var css=fs.readFileSync(file,"utf-8");
	var less_end=css.indexOf("/*preLess end*/");
	var css_main=css.substr(less_end+15);
	fs.writeFile(file,css_main);
});

//压缩css
gulp.task('css', function() {
    return gulp.src('resource_pre/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('resource/css'))
});


//合并压缩js
gulp.task('scripts', function () {
    return gulp.src(['resource_pre/js/*.js','!resource_pre/js/require.js'])
        .pipe(requirejsOptimize(function(file) {
        	return {
	            exclude: [
	                "lib/jquery-1.10.2.js",
	                'layout/common.js'
	            ]
        	};
		}))
        .pipe(gulp.dest('resource/js'));
});



//转移文件
gulp.task('trans_require', function() {
	return gulp.src(["resource_pre/js/require.js"])
    .pipe(gulp.dest('resource/js'))
});
gulp.task('trans_lib', function() {
	return gulp.src(["resource_pre/js/lib/*.js"])
    .pipe(gulp.dest('resource/js/lib'))
});


//html内less转css
gulp.task('lessToCss', function() {
	var src="resource_pre/";
	var dest="resource/";
	var rf=require("fs");
	rf.exists(dest,function(exists){
		//dest目录不存在时新建
		if(exists===false){ rf.mkdir(dest); }
		//遍历出.html
		files=rf.readdirSync(src);
		var fileList=[];
		files.forEach(function(self){
			if(/.html/.test(self)){
				fileList.push(self);
			}
		});
		//修改html内容
		fileList.forEach(function(file){
			var data=rf.readFileSync(src+file,"utf-8");  
			data=data.replace(/text\/less/g,"text/css")
			data=data.replace(/less\//g,"css/")
			data=data.replace(/\.less/g,".css")
			data=data.replace('<script language="javascript" type="text/javascript" src="js/less.js"></script>','');
			rf.writeFile(dest+file,data);
		});
	});
});


//task执行顺序
gulp.task('default', ['scripts','lessToCss','trans_require','trans_lib'],function(){});

