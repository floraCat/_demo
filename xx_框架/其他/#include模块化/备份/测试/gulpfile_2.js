
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


//项目一
// var Path={
//     src:{
//         baseUrl:'resource_pre/',
//         image:'resource_pre/images/images_demo/',
//         css:'resource_pre/css/',
//         js:'resource_pre/js/'
//     },
//     dest:{
//         baseUrl:'resource/',
//         image:'resource/images/images_demo/',
//         css:'resource/css/',
//         js:'resource/js/'
//     }
// }

//项目二
var Path={
    src:{
        baseUrl:'resource2_pre/',
        image:'resource2_pre/images/images_demo/',
        css:'resource2_pre/css/',
        js:'resource2_pre/js/'
    },
    dest:{
        baseUrl:'resource2/',
        image:'resource2/images/images_demo/',
        css:'resource2/css/',
        js:'resource2/js/'
    }
}



//压缩图片
gulp.task('image', function() {
    return gulp.src(Path.src.image+'*.{png,jpg}')
    .pipe($.imagemin())
    .pipe(gulp.dest(Path.dest.image))
});


//less解析为css
gulp.task('less', function() {
    return gulp.src(Path.src.baseUrl+'less/*.less')
    .pipe($.less())
    .pipe(gulp.dest(Path.src.css))
});


//压缩css
gulp.task('css',['less'], function() {
    return gulp.src(Path.src.css+'*.css')
    .pipe($.minifyCss())
    .pipe(gulp.dest(Path.dest.css))
});


//合并压缩js
gulp.task('js', function () {
    return gulp.src([Path.src.js+'*.js','!'+Path.src.js+'r*.js','!'+Path.src.js+'less.js'])
        .pipe($.requirejsOptimize(function(file) {
            return {
                baseUrl:Path.src.js,
                mainConfigFile:Path.src.js+'rconfig.js',
                exclude: [
                    "rconfig",
                    "app/jquery-1.10.2"
                    //'app/common.js'
                ]
            };
        }))
        .pipe(gulp.dest(Path.dest.js));
});




//项目一
gulp.task("dev",function(cb){
    return $.runSequence('image','css','js',cb);
});




//task执行顺序
gulp.task('default', ['dev'],function(){
	//alert("ok");
});

