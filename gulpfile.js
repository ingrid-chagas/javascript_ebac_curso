import gulp from 'gulp'; //require usado para importar algumas bibliotecas no js
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import image from 'gulp-image'; //npm install gulp-image --save-dev(apenas para desenvolvimento) 
import stripCss from 'gulp-strip-css-comments';
import stripJs from 'gulp-strip-comments';
import babel from 'gulp-babel';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync'

const build = browserSync.create();
const reload = browserSync.reload;


//gulp trabalha com tasks

gulp.task('styles', function(){
    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css', 
                        './vendor/owl/css/owl.css',
                        './src/css/style.css'])
                .pipe(stripCss()) // remove comentários
                .pipe(concat('libs.css')) //primeiro concatena
                .pipe(cssmin()) //depois minifica o que foi concatenado
                .pipe(rename({ suffix: '.min' })) //lib.min.css
                .pipe(gulp.dest('./dist/css')) //dist pasta final de producao
    //src(pasta de onde ele vai buscar) dest(DESTino onde ele vai jogar os arquivos depois de processar)
});

gulp.task('scripts', function(){
    return gulp.src(['./node_modules/jquery/dist/jquery.js',
                    './node_modules/bootstrap/dist/js/bootstrap.js',
                    './vendor/owl/js/owl.js',
                    './vendor/jquery/jquery-mask/jquery.mask.js',
                    './src/js/custom.js'
                    //'./vendor/**/*.js'
                ])
                .pipe(babel({
                    comments: false,
                    presets: ['@babel/env']
                }))
                .pipe(concat('libs.js'))
                .pipe(uglify())
                .pipe(rename({ suffix: '.min' })) //libs.min.js
                .pipe(gulp.dest('./dist/js'))
});

//otimizacao de imagens
gulp.task('images', function(){
    return gulp.src('./src/images/*')
                .pipe(image({
                    pngquant: true,
                    optipng: false,
                    zopflipng: true,
                    jpegRecompress: false,
                    mozjpeg: true,
                    gifsicle: true,
                    svgo: true,
                    concurrent: 10,
                    quiet: true
                }))
                .pipe(gulp.dest('./dist/images'))
});

gulp.task('htmlTask', function(){
    return gulp.src('./src/*.html')
                .pipe(htmlmin({ collapseWhitespace: true }))
                .pipe(gulp.dest('./dist'));
});

gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process) // repete o processo quando alterar algo em src
    gulp.watch('./src/**/*').on('change', reload)

});

const process = gulp.series( 'styles', 'scripts', 'htmlTask');

//listener para qualquer alteração no src ele roda o gulpfile
//quando o servidor está de pé ou watch rodando
// gulp.task('watch', function() {
//     gulp.watch('./src/css/*.css', gulp.series('styles'));
//     gulp.watch('./src/js/*.js', gulp.series('scripts'));
//     gulp.watch('./src/*.html', gulp.series('htmlTask'));
//     gulp.watch('./src/images/*', gulp.series('images'));
// });

//apos npm install apenas rodas 'gulp'
// gulp.task('default', gulp.series('styles', 'scripts', 'images', 'watch'));
// gulp.task('default', function(){
//     return gulp.parallel('styles', 'scripts', gulp.series('watch'));
// });