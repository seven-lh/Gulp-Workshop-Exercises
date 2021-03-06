var gulp = require('gulp');
var p = require('gulp-load-plugins')();


gulp.task('scripts', function() {
  gulp.src('source/scripts/**/*.coffee')
    .pipe(p.plumber())
    .pipe(p.sourcemaps.init())
    .pipe(p.coffee())
    .pipe(p.concat('all.js'))
    .pipe(p.uglify())
    .pipe(p.sourcemaps.write('.'))
    .pipe(gulp.dest('build/'))
});


gulp.task('styles',function(){
  gulp.src('source/style.scss')
    .pipe(p.plumber())
    .pipe(p.sourcemaps.init())
    .pipe(p.sass())
    .pipe(p.autoprefixer())
    .pipe(p.sourcemaps.write('.'))
    .pipe(gulp.dest('build/'))
})


gulp.task('templates',function(){
  gulp.src('source/**/*.jade')
    .pipe(p.plumber())
    .pipe(p.jade({
      pretty : true,
      locals : {
        name : 'My Amazing Website'
      }
    }))
    .pipe(gulp.dest('build/'))
});

gulp.task('clean',function() {
  return gulp.src('build/', { read : false }) // the read:false just makes things faster - delete it without reading the files
    .pipe(p.clean())
    .pipe(p.notify('Cleaned!'))
});

gulp.task('watch', function() {
  gulp.watch('source/style.scss',['styles']);
  gulp.watch('source/scripts/**/*.coffee',['scripts']);
  gulp.watch('source/**/*.jade',['templates']);
});


gulp.task('default', ['clean', 'scripts', 'styles','templates', 'watch']);
