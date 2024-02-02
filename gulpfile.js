import gulp from 'gulp'; //require usado para importar algumas bibliotecas no js
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import image from 'gulp-image'; //npm install gulp-image --save-dev(apenas para desenvolvimento) 
import stripCss from 'gulp-strip-css-comments';
import stripJs from 'gulp-strip-comments';
import fontmin from 'gulp-fontmin';
import babel from 'gulp-babel';
import htmlmin from 'gulp-htmlmin';
import browserSync from 'browser-sync'

const build = browserSync.create();
const reload = browserSync.reload;

//gulp trabalha com tasks

gulp.task('styles', function(){
    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css',
                        'node_modules/slick-carousel/slick/slick.css' ,
                        'node_modules/slick-carousel/slick/slick-theme.css' ,
                        './node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css',
                        // './vendor/owl/css/owl.css',
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
                    "./node_modules/slick-carousel/slick/slick.js",
                    // './vendor/owl/js/owl.js',
                    './node_modules/jquery-mask-plugin/dist/jquery.mask.js',
                    './node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
                    './src/js/custom.js'
                    //'./vendor/**/*.js'
                ])
                .pipe(babel({
                    comments: false,
                    presets: ['@babel/env']
                }))
                .pipe(concat('libs.js'))
                // .pipe(uglify())
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

gulp.task('fontsmin', function () {
    return gulp.src('node_modules/slick-carousel/slick/fonts/*')
        .pipe(fontmin())
        .pipe(gulp.dest('./dist/css/fonts'));
});



gulp.task('slick_gif', function () {
    return gulp.src('node_modules/slick-carousel/slick/*.gif')
        .pipe(gulp.dest('./dist/css'));
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

//apos npm install apenas rodas 'gulp'
gulp.task('default', gulp.series('styles', 'scripts', 'fontsmin', 'images', 'slick_gif','htmlTask', 'serve'));

//listener para qualquer alteração no src ele roda o gulpfile
// gulp.task('watch', function() {
//     gulp.watch('./src/*', ['styles', 'scripts', 'fontsmin', 'images', 'slick_gif','htmlTask']);
// });