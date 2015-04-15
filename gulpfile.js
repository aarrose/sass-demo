var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require ('gulp-notify'),
    bower = require('gulp-bower');
    //autoprefixer = require('gulp-autoprefixer'),   
    //plumber = require('gulp-plumber'),
    //watch = require('gulp-watch');

var config = {
  sassPath: './sass',
  bowerPath: './bower_components',
  srcPath: './src'
};

// Default task
gulp.task('default', ['bower', 'css', 'watch']);


// Watch Task
gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/**/*.{scss,sass}');
});

// Gulp-Watch Task
// gulp.task('watch', function () {
//    gulp.src(config.srcPath + '/css/*.css')
//      .pipe(watch(config.sassPath + '/**/*.scss'))
//      .pipe(gulp.dest('./build/'));
// });

// Additional Tasks
gulp.task('bower', function() {
  return bower().pipe(gulp.dest(config.bowerPath));
});

gulp.task('css', function() {
  return gulp.src(config.sassPath +  '/main.scss')
    .pipe(sass({
      style: 'compressed',
      loadPath: [
        config.sassPath
      ]
    })
    .on("error", notify.onError(function(error) {
        return "Error: " + error.message;
    })))
    /*
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    */
    .pipe(gulp.dest(config.srcPath + '/css'));
});
