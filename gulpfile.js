const gulp = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const minify = require('gulp-minify')
const concat = require('gulp-concat')

gulp.task('js', function () {
  return gulp
    .src(['src/util.js', 'src/das.js', 'src/bdas.js'])
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-es2015-modules-umd']
    }))
    .pipe(concat('das.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(minify({ext: {min: '.min.js'}}))
    .pipe(gulp.dest('dist'))
})
