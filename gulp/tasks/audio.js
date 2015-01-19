var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('audio', function(callback) {
  gulp.src('./src/audio/*.mp3')
    .pipe(gulp.dest('./audio'))
    .on('end', callback);
  gutil.log('Copying Audio Complete!');
});
