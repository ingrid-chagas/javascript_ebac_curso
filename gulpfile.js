const gulp = require('gulp'); //require usado para importar algumas bibliotecas no js
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


//gulp trabalha com tasks

function cssTasks(callback){
    return gulp.src('./vendor/**/*.css')
                    .pipe(concat('libs.css')) //primeiro concatena
                    .pipe(cssmin()) //depois minifica o que foi concatenado
                    .pipe(rename({ suffix: '.min' })) //lib.min.css
                    .pipe(gulp.dest('./dist/css')) //dist pasta final de producao
    //src(pasta de onde ele vai buscar) dest(DESTino onde ele vai jogar os arquivos depois de processar)
}

function jsTasks(callback){
    return gulp.src('./vendor/**/*.js')
                .pipe(concat('libs.js'))
                .pipe(uglify())
                .pipe(rename({ suffix: '.min' })) //libs.min.js
                .pipe(gulp.dest('./dist/js'))
}

exports.styles = cssTasks; //nao passa a funcao, apenas o nome
exports.scripts = jsTasks;