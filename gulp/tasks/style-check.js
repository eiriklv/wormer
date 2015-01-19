var gulp = require('gulp');
var jsxcs = require('gulp-jscs');

var filePaths = [
  '**/*.js',
  '!node_modules/**',
  '!dist/**'
];

gulp.task('style-check', function() {
  return gulp.src(filePaths)
    .pipe(jscs());
});
