/*!
 * gulp
 * $ npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    // sass = require('gulp-ruby-sass'),
    // autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    // imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    // cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del'),
    cssnano = require('gulp-cssnano');
    // util = require('gulp-util');

// Styles
gulp.task('styles', function() {
  return gulp.src('public/css/*.css')
    // sass('src/styles/main.scss', { style: 'expanded' })
    // .pipe(autoprefixer('last 2 version'))
    // .pipe(gulp.dest('dist/styles'))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('public/css/dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano())
    .pipe(gulp.dest('public/css/dist'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src([
    'public/js/app/app.js',
    'public/js/app/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js/dist'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('public/js/dist'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
// gulp.task('images', function() {
//   return gulp.src('src/images/**/*')
//     .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('dist/images'))
//     .pipe(notify({ message: 'Images task complete' }));
// });

// Clean
gulp.task('clean', function() {
  // return del(['dist/styles', 'dist/scripts', 'dist/images']);
  return del(['public/css/dist/**/*', 'public/js/dist/**/*']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  // gulp.watch('src/styles/**/*.scss', ['styles']);

  // Watch .js files
  // gulp.watch('src/scripts/**/*.js', ['scripts']);

  // Watch image files
  // gulp.watch('src/images/**/*', ['images']);

  gulp.watch('public/css/*.css', ['styles']);
  gulp.watch('public/js/app/*.css', ['scripts']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['public/css/dist/*', 'public/js/dist/*' ]).on('change', livereload.changed);
});
