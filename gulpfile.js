'use strict'

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var test = require('./test');

gulp.task('build', function() {
  gulp.src('src/index.js')
    .pipe(webpack({
      output: {
        filename:'bundle.js'
      }
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('test', test);

gulp.task('watch', function() {
  gulp.watch(['test/*.js'], ['test']);
  gulp.watch(['src/*.js', 'test/*.js'], ['test', 'build']);
});

gulp.task('default', ['test', 'build', 'watch']);
