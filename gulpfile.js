import gulp from 'gulp'; //require usado para importar algumas bibliotecas no js
import concat from 'gulp-concat';
import cssmin from 'gulp-cssmin';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import image from 'gulp-image'; //npm install gulp-image --save-dev(apenas para desenvolvimento) 
import stripCss  from 'gulp-strip-css-comments';


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
                .pipe(stripCss()) // remove comentários
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

//apos npm install apenas rodas 'gulp'
gulp.task('default', gulp.series('styles', 'scripts', 'images'));

//listener para qualquer alteração no src ele roda o gulpfile
gulp.task('watch', function() {
    gulp.watch('./src/*.js', ['styles', 'scripts', 'images']);
});