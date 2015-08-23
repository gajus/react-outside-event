import gulp from 'gulp';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';
import scsslint from 'gulp-scss-lint';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';

gulp.task('lint', () => {
    return gulp
        .src(['./src/app/**/*.js', './src/tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('test', ['lint'], () => {
    return gulp
        .src('./tests/**/*.js', {
            read: false
        })
        .pipe(mocha());
});

gulp.task('scss-lint', () => {
    return gulp
        .src('./src/static/*.scss')
        .pipe(scsslint({
            config: './lint.yml',
            endless: true,
            verbose: false
        }));
});

gulp.task('scss', ['scss-lint'], () => {
    return gulp
        .src('./src/static/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./src/endpoint/static'))
});

gulp.task('watch', () => {
    gulp.watch(['./src/app/**/*', './tests/**/*'], ['default']);
    gulp.watch(['./src/static/**/*'], ['scss']);
});

gulp.task('default', ['test']);
