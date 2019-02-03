const { series, parallel, src, dest, watch } = require('gulp');
const webpack    = require('webpack');
const gutil      = require('gulp-util');
const notifier   = require('node-notifier');
var sass         = require('gulp-sass');
let webpackConfig = require('./webpack.config.js');
let statsLog      = { // для красивых логов в консоли
  colors: true,
  reasons: true
};

sass.compiler = require('node-sass');

function scripts(done) {
  // run webpack
  webpack(webpackConfig, onComplete);
  function onComplete(error, stats) {
    if (error) { // кажется еще не сталкивался с этой ошибкой
      onError(error);
    } else if ( stats.hasErrors() ) { // ошибки в самой сборке, к примеру "не удалось найти модуль по заданному пути"
      onError( stats.toString(statsLog) );
    } else {
      onSuccess( stats.toString(statsLog) );
    }
  }
  function onError(error) {
    let formatedError = new gutil.PluginError('webpack', error);
    notifier.notify({ // чисто чтобы сразу узнать об ошибке
      title: `Error: ${formatedError.plugin}`,
      message: formatedError.message
    });
    done(formatedError);
  }
  function onSuccess(detailInfo) {
    gutil.log('[webpack]', detailInfo);
    done();
  }
}

function styles(cb) {
  src('./src/lib/styles/styles.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(dest('./build/lib'));
  cb();
}

function watchScripts(cb) {
  watch('./src/lib/**/*.js', scripts);
  cb();
}

function watchStyles(cb) {
  watch('./src/lib/styles/**/*.scss', styles);
  cb();
}

exports.build = scripts;
exports.default = parallel(scripts, styles);
exports.develop = parallel(watchScripts, watchStyles);