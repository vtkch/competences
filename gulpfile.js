'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassdoc = require('sassdoc');
var concat = require('gulp-concat');
var csso = require('gulp-csso');

gulp.task('sass', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function () {
    gulp.watch('./sass/*.scss', ['sass']);
});

gulp.task('build', function () {
    gulp.src('./sass/pb-grid.scss')
        .pipe(sass())
        .pipe(csso())
        .pipe(gulp.dest('build/'));
});

gulp.task('sassdoc', function () {
    return gulp.src('./sass/*.scss')
        .pipe(sassdoc());
});