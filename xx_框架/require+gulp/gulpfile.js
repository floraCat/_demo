var gulp = require('gulp'),
    //less = require('gulp-less'),
    //minifycss = require('gulp-minify-css'),
    /*uglify = require('gulp-uglify'),*/
	requirejsOptimize=require('gulp-requirejs-optimize');
    //imagemin = require('gulp-imagemin');



// less解析为css
// gulp.task('less', function() {
//     return gulp.src('_site/less/less_test.less')
//     .pipe(less())
//     .pipe(gulp.dest('_site/less'))
// });


// //压缩css
// gulp.task('css', function() {
//     return gulp.src('_site/css/*.css')
//     .pipe(minifycss())
//     .pipe(gulp.dest('_site/css'))
// });


// //压缩js
// gulp.task('rjs_build', function() {
//     rjs({
// 		baseUrl:'_site/build.js',
// 		out:'_site/dist/build_main.js'
// 	})
//     .pipe(gulp.dest('_site/js'))
// });


// //压缩图片（整文件夹指定格式）
// gulp.task('images', function() {
//     return gulp.src('_site/images/*.{png,jpg,gif}')
//     .pipe(imagemin())
//     .pipe(gulp.dest('_site/images'))
// });



gulp.task('scripts', function () {
    return gulp.src('_site/build.js')
        .pipe(requirejsOptimize())
        .pipe(gulp.dest('dist'));
});


gulp.task('default', ['scripts'],function(){});
