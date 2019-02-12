var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');



// less解析为css
gulp.task('test', function() {
    return gulp.src('_site/less/less_test.less')
    .pipe(less())
    .pipe(gulp.dest('_site/less'))
});


//压缩css
gulp.task('test', function() {
    return gulp.src('_site/css/*.css')
    .pipe(minifycss())
    .pipe(gulp.dest('_site/css'))
});


//压缩js
gulp.task('test', function() {
    return gulp.src('js/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('js'))
});


//压缩图片（单个）
gulp.task('test3', function() {
    return gulp.src('imgs/aaa.png')
    .pipe(imagemin())
    .pipe(gulp.dest('imgs2'))
});


//压缩图片（整文件夹指定格式）
gulp.task('test4', function() {
    return gulp.src('images/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('images2'))
});