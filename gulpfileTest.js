var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');  //编译sass
var concatCss = require('gulp-concat-css');  //合并css
var minifyCss = require('gulp-minify-css');  //压缩css在一行
var imagemin = require('gulp-imagemin');  //图片压缩
// var livereload = require('gulp-livereload');  //自动刷新 (配合浏览器插件？)
var sftp = require('gulp-sftp');  //sftp上传
// var argv = require('yargs').argv;  //定义命令文件参数
var uglify = require('gulp-uglify');

//默认任务
gulp.task('default',function(){
    console.log('hello gulp');

    console.log(argv);
    //检测sass修改
    var watcher = gulp.watch('public/sass/*',['sass']);
    watcher.on('change',function(event){
        console.log('watch sass ' + event.path + 'was ' + event.type);        
    });
});


            // return gulp.src(['./test/*/**'])
            //     .pipe(sftp({
            //         host: '***.***.**.**',
            //         user: 'ulife',
            //         pass: 'ulife',
            //         remotePath: '/home/ulife/deployment/apps/h5'
            //     }));

// sftp上传
gulp.task('sftp',function(){
    console.log('sftp upload');
    return gulp.src('**')
        .pipe(sftp({
            host: '',//ip
            user: '',//用户名
            pass: '',//密码
            remotePath: '/var/local/www/liege/sftpts'
        }));
});

//压缩图片
gulp.task('imagemin',function(){
    console.log('image min');
    gulp.src('public/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/img/min'));
});

//编译sass
gulp.task('sass',function(){
    console.log('run sass');
    gulp.src('public/sass/*')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('public/css'));
});

//合并压缩css
gulp.task('concatCss',function(){
    console.log('concat css');
    gulp.src('public/css/*')
        .pipe(concatCss('concat.css'))
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/css/'));
});
//压缩js
gulp.task('minifyjs',function(){
    gulp.src('js/*.js')//要压缩的js文件
    .pipe(uglify()) //使用uglify进行压缩，更多配置请参考：
    .pipe(rename({ suffix: '.min' }))//让压缩过的js带min后缀
    .pipe(gulp.dest('dist/js'));//压缩后的路径
});

//css文件压缩
//模块 gulp-minify-css
gulp.task('minfy-css',function(){
    gulp.src('css/*.css')//要压缩的css文件
    .pipe(minifyCss())//压缩css
    .pipe(rename({ suffix: '.min' }))//让压缩过的css带min后缀
    .pipe(gulp.dest('dist/css'));//压缩后的路径
});

//html文件压缩
//模块gulp-minify-html
gulp.task('minify-html',function(){
    gulp.src('html/*.html')//要压缩的html文件
    .pipe(minifyHtml())//压缩
    .pipe(gulp.dest('dist/html'));//压缩后的路径
});

//js代码检查
//模块gulp-jshint
gulp.task('jsLint',function(){
    gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());//输出检查结果
})

//文件合并css  js  
//模块gulp-concat
gulp.task('concat',function(){
    gulp.src('js/*.js')
    .pipe(concat('all.js'))//生成合并文件的名字
    .pipe(gulp.dest(dist/js));
});
