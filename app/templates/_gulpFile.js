var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function(){
    gulp.src('<%= name %>.js')
        pipe(uglify())
        pipe(rename({ extname: '.min.js' }))
        pipe(gulp.dest('./'));
});
