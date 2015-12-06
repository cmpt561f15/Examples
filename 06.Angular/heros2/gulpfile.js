var gulp = require('gulp');

var PATHS = {
    src: 'src/app/**/*.ts'
};

/*gulp.task('clean', function (done) {
    var del = require('del');
    del(['js'], done);
});*/

gulp.task('ts2js', function () {
    var typescript = require('gulp-typescript');
    //var tsResult = gulp.src(PATHS.src)
    var tsResult = gulp.src(PATHS.src, { base: "./" })
        .pipe(typescript({
            noImplicitAny: true,
            module: 'system',
            target: 'ES5',
            moduleResolution: 'node',
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        }));

    //return tsResult.js.pipe(gulp.dest('js'));
    return tsResult.js.pipe(gulp.dest('.'));
});

gulp.task('run', ['ts2js'], function () {
    var http = require('http');
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var open = require('open');

    var port = 8090, app;

    gulp.watch(PATHS.src, ['ts2js']);

    app = connect().use(serveStatic(__dirname));
    http.createServer(app).listen(port, function () {
        open('http://localhost:' + port);
    });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['run']);

