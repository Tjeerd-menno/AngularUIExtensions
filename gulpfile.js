var gulp = require('gulp');
var bower = require('gulp-bower');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var runSequence = require('run-sequence');
var del = require('del');
var merge = require('merge2');


gulp.task('clean', function () {
    del.sync(['dist/*.*']);
});

gulp.task('bower-restore', function () {
	return bower();
});

gulp.task('typescript-build', function () {
	
	var tsProject = typescript.createProject('tsconfig.json', { declarationFiles : true } );
	
	var tsResult = tsProject.src()
		.pipe(typescript(tsProject));
		
	return merge([
	    tsResult.dts.pipe(gulp.dest('dist')),
	    tsResult.js.pipe(gulp.dest('dist'))
	    ]);		
});

gulp.task('minify', function() {
	
	return gulp.src('dist/dfz-angular-uiextensions.js')
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
	
	runSequence('clean', 'bower-restore', 'typescript-build', 'minify'); 
	
});