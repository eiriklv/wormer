var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('html', function(callback) {
  gulp.src('./src/html/*.html')
    .pipe(gulp.dest('./dist'))
    .on('end', callback);
  gutil.log('Copying HTML Complete!');
});
