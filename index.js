var gulp        = require('gulp');
var browserSync = require('browser-sync');
var notify 		= require('gulp-notify');
var _           = require('underscore');
var elixir 		= require('laravel-elixir');
var reload 		= browserSync.reload;

function notify_message(title, subtitle, message, icon){
    gulp.src('').pipe(notify({
        title: title,
        subtitle: subtitle,
        icon: __dirname + icon,
        message: message
    }));
}

elixir.extend("BrowserSync",  function(options, src){

    var defaultSrc = [
        "app/**/*",
        "public/**/*",
        "resources/views/**/*"
    ];

    options = _.extend({
        proxy 			: "homestead.app",
        logPrefix		: "Laravel elixir BrowserSync",
        logConnections	: true,
        reloadOnRestart : true,
        notify 			: true
    }, options);

    src = src || defaultSrc;

    gulp.task("BrowserSync", function(){

        var onError = function(err){
            notify.onError({
                title 		: "BrowserSync",
                subtitule	: "BrowserSync Filed!",
                message 	: "Error : <%= error.message %>",
                icon		: __dirname + '/../icons/fail.png'
            })(err);

            this.emit('end');
        }


        if(browserSync.active === true){
            browserSync.reload;
            notify_message('Laravel Elixir BrowserSync', 'BrowserSync Reload', '', '/../laravel-elixir/icons/pass.png');
        } else {
            browserSync(options);
            gulp.watch(src).on('change', reload);
            notify_message('Laravel Elixir BrowserSync', 'BrowserSync Start', '', '/../laravel-elixir/icons/pass.png');
        }
    });

    return this.queueTask("BrowserSync");
});