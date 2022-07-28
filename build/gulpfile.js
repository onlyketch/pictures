var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	inlineCss = require('gulp-inline-css'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	mozJPEG = require('imagemin-mozjpeg'),
	del = require('del');

gulp.task('cleanImg', function() {
	return del('dist/*.{jpg,png,gif}')
});

gulp.task('compress', function() {
return gulp.src('source/*.{jpg,png}')
	   .pipe(imagemin([
	   			pngquant(),
				mozJPEG({
					quality: 95
				})
			], {
					verbose: true
			}))
	   .pipe(gulp.dest('dist/'))
	   .pipe(browserSync.reload({stream: true}))
});

gulp.task('inlineCss', function() {
return gulp.src('source/*.html')
 .pipe(inlineCss({
 	removeHtmlSelectors: true,
 	removeStyleTags: true,
 	removeLinkTags: false
 }))
 .pipe(gulp.dest('dist/'))
 .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
	browserSync({ 
		server: { 
			baseDir: 'dist' 
		},
		notify: false
	});
});

gulp.task('watch', function() {
	gulp.watch('source/*.html', gulp.parallel('inlineCss'));
	gulp.watch('source/*.{jpg,png}', gulp.parallel('cleanImg','compress'));
});

gulp.task('default', gulp.parallel('inlineCss', 'compress', 'browser-sync', 'watch'));