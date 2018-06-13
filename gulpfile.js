var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

// Move the javascript files into our /app/js folder
gulp.task('js', function() {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
        .pipe(gulp.dest("app/js"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'app/scss/*.scss'], ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// copy app to dist
gulp.task('copy', function() {
  return gulp.src('app/**/*')
      .pipe(gulp.dest('dist/'))
});

gulp.task('default', ['js','serve']);
