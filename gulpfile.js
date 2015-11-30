var gulp    = require('gulp');
var notify  = require('gulp-notify');
var plumber = require('gulp-plumber');

// Load the PostCSS module.
var postcss = require('postcss');
var post    = require('gulp-postcss');

// Define the plugin.
var karl = postcss.plugin('postcss-carl', function (opts) {
    return function (css, result) {
        css.walkDecls( function (string) {
           console.log(string)
        });

        css.walkRules(function(rule) {
            // В начале селектора
            if( /^\/\//.test(rule.selector) ) {
                rule.selector = rule.selector.replace( /^\/\/.*/, '').replace( '\n', '');
                console.log(rule.selector)
            }
        });
    };
});

// Make PostCSS aware of this plugin.
postcss().use(karl);

gulp.task('css', function() {
    return gulp.src([
        'src/**/*.css'
    ])
        .pipe(plumber({
            errorHandler: notify.onError('Error: <%= error.message %>')
        }))
        .pipe(post([karl()]))
        .pipe(gulp.dest('build/css'));
});

gulp.task('default', ['css']);