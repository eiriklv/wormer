var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('watch', ['build'], function(callback) {
  gulp.watch('./src/css/*.styl', ['stylus']);
  gulp.watch('./src/html/*.html', ['html']);

  gutil.log('Watching completed!');
  callback();
});
