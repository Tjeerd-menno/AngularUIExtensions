var gulp = require('gulp');
var bower = require('gulp-bower');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var typescript = require('gulp-typescript');
var runSequence = require('run-sequence');
var del = require('del');
var request = require('request');
var fs = require('fs');
var nuget = require('gulp-nuget');

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
		
	return tsResult.js.pipe(gulp.dest('dist'));		
});

gulp.task('minify', function() {
	
	return gulp.src('dist/dfz-angular-uiextensions.js')
		.pipe(uglify())
		.pipe(rename({ extname: '.min.js' }))
		.pipe(gulp.dest('dist'));
});

gulp.task('nuget-download', function(done) {
    if(fs.existsSync('nuget.exe')) {
        done();
        return;
    }

    request.get('http://nuget.org/nuget.exe')
        .pipe(fs.createWriteStream('nuget.exe'))
        .on('close', done);
});

gulp.task('nuget-pack-n-push', function() {
    var nugetPath = 'nuget.exe';

    gulp.src('dist/*.js')
        .pipe(nuget.pack({ nuspec: 'Package.nuspec', nuget: nugetPath }))
        .pipe(nuget.push({ feed: 'http://nuget.defriesland.nl/nuget/DFZ', nuget: nugetPath, apiKey: 'dfz-vm307:dfz-vm307' }));
});

gulp.task('default', function () {
	
	runSequence('clean', 'bower-restore', 'typescript-build', 'minify','nuget-download','nuget-pack-n-push'); 
	
});