var gulp = require('gulp'),
aSass = require('gulp-sass'),
browserSync = require('browser-sync'),
concat = require('gulp-concat'),
uglify = require('gulp-uglifyjs'),
cssNano = require('gulp-cssnano'),
gRename = require('gulp-rename'),
// del = require('del'),
// imageMin = require('gulp-imagemin'),
// pngQuant = require('imagemin-pngquant'),
// cache = require('gulp-cache'),
autoPrefixer = require('gulp-autoprefixer');

gulp.task('makeSass', function() {
return gulp.src('src/sass/**/*.sass')
 .pipe(aSass())
 .pipe(autoPrefixer(['last 15 versions', '> 1%'], {cascade: true }))
 .pipe(gulp.dest('src/css'))
 .pipe(browserSync.reload({stream: true}))
});

gulp.task('bsync', function() {
browserSync({
    server: {
        baseDir: 'src'
    }
});
});

gulp.task('scripts', function() {
return gulp.src([
    'src/libs/jquery/dist/jquery.min.js',
    'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js'
])
.pipe(concat('libs.min.js')
.pipe(uglify()))
.pipe(gulp.dest('src/js'));
});

gulp.task("css-libs", ['makeSass'], function() {
return gulp.src('src/css/libs.css').pipe(cssNano())
.pipe(gRename({suffix: '.min'}))
.pipe(gulp.dest('src/css'));
});

gulp.task('watchTask', ['bsync', 'makeSass'/*'css-libs', 'scripts'*/], function() {
gulp.watch('src/sass/**/*.sass', ['makeSass']);
gulp.watch('src/*.html', browserSync.reload);
gulp.watch('src/js/**/*.js', browserSync.reload);
});

// gulp.task('build',['clean', 'img', 'makeSass', 'scripts'], function() {
// var buildCss = gulp.src([
//     'app/css/main.css',
//     'app/css/libs.min.css'
// ])
// .pipe(gulp.dest('dist/css'));

// var buildFonts = gulp.src('app/fonts/**/*')
// .pipe(gulp.dest('dist/fonts'));

// var buildJs = gulp.src('app/js/**/*')
// .pipe(gulp.dest('dist/js'));

// var buildHtml = gulp.src('app/*.html')
// .pipe(gulp.dest('dist'));
// });

// gulp.task('clean', function() {
// return del.sync('dist');
// });

// gulp.task('img', function() {
// return gulp.src('app/img/**/*')
// .pipe(cache(imageMin({
//     interlaced: true,
//     progressive: true,
//     svgoPlugins: [{removeViewBox: false}],
//     use: [pngQuant()]
// })))
// .pipe(gulp.dest('dist/img'));
// });

// gulp.task('clearCache', function() {
// return cache.clearAll();
// });