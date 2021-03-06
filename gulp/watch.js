'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./config');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function () {

  gulp.watch([path.join(conf.paths.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch([
    path.join(conf.paths.src, '/assets/**/*.scss')
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch([path.join(conf.paths.src, '/app/**/*.js'),path.join(conf.paths.src, '/components/**/*.js')], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch([path.join(conf.paths.src, '/app/**/*.html'),path.join(conf.paths.src, '/components/**/*.html')], function(event) {
    browserSync.reload(event.path);
  });
});
