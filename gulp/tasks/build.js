var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('build', ['stylus', 'browserify', 'html', 'images', 'audio'], function(callback) {
  gutil.log('All building completed!');
  callback();
});
