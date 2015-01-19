var gulp = require('gulp');
var stylus = require('gulp-stylus');
var cssmin = require('gulp-cssmin');
var nib = require('nib');
var NopStream = require('../util/no-op-stream');

var production = process.env.NODE_ENV === 'production';

gulp.task('stylus', function(callback) {
  gulp.src('./src/css/*.styl')
    .pipe(stylus({
      use: [nib()],
      import: ['nib']
    }))
    .pipe(production ? cssmin() : (new NopStream()))
    .pipe(gulp.dest('./dist/css'))
    .on('end', callback);
});
