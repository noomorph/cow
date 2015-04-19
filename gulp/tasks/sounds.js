'use strict';

var config = require('../config');
var gulp = require('gulp');

gulp.task('sounds', function() {
	var dest = config.dist + '/sounds';

	return gulp.src('app/sounds/**/*')
		.pipe(gulp.dest(dest));
});

gulp.task('sounds:dist', ['sounds']);
