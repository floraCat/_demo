
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();


//项目一
var Path={
    src:{
        baseUrl:'resource_pre/',
        image:'resource_pre/images/images_demo/',
        css:'resource_pre/css/',
        js:'resource_pre/js/'
    },
    dest:{
        baseUrl:'resource/',
        image:'resource/images/images_demo/',
        css:'resource/css/',
        js:'resource/js/'
    }
}

//项目二
// var Path={
//     src:{
//         baseUrl:'resource2_pre/',
//         image:'resource2_pre/images/images_demo/',
//         css:'resource2_pre/css/',
//         js:'resource2_pre/js/'
//     },
//     dest:{
//         baseUrl:'resource2/',
//         image:'resource2/images/images_demo/',
//         css:'resource2/css/',
//         js:'resource2/js/'
//     }
// }



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
    return gulp.src([Path.src.js+'*.js','!'+Path.src.js+'require.js','!'+Path.src.js+'less.js'])
        .pipe($.requirejsOptimize(function(file) {
            return {
                mainConfigFile:Path.src.js+'rconfig.js',
                exclude: [
                    "app/jquery-1.10.2",
                    'app/common.js'
                ]
            };
        }))
        .pipe(gulp.dest(Path.dest.js));
});



//压缩并转移文件
gulp.task('trans_require', function() {
    return gulp.src([Path.src.js+"require.js"])
    .pipe($.uglify())
    .pipe(gulp.dest(Path.dest.js))
});
gulp.task('trans_app', function() {
    return gulp.src([Path.src.js+"app/common.js",Path.src.js+"app/jquery-1.10.2.js"])
    .pipe($.uglify())
    .pipe(gulp.dest(Path.dest.js+"app"))
});


//html内less转css
gulp.task('lessToCss', function() {
    var src=Path.src.baseUrl;
    var dest=Path.dest.baseUrl;
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



//项目一
gulp.task("dev",['image','css','js','trans_require','trans_app','lessToCss'],function(){});




//task执行顺序
gulp.task('default', ['dev'],function(){
	//alert("ok");
});

