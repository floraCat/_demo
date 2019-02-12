var gulp = require('gulp');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
//var uglify = require('gulp-uglify');
//var rjs=require('gulp-requirejs');
var imagemin = require('gulp-imagemin');



// less解析为css
gulp.task('less', function() {
    return gulp.src('_site/less/less_test.less')
    .pipe(less())
    .pipe(gulp.dest('_site/less/gulp'))
});


//压缩css
gulp.task('css', function() {
    return gulp.src('_site/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('_site/css/gulp'))
});


//压缩js
/*gulp.task('build', function() {
    rjs({
		baseUrl:'_site/build.js',
		out:'_site/dist'
	})
    //.pipe(gulp.dest('_site/js/gulp'))
});*/


//压缩图片（整文件夹指定格式）
gulp.task('images', function() {
    return gulp.src('_site/images/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('_site/images/gulp'))
});


gulp.task('default', ['less','css','build','images'],function(){});
