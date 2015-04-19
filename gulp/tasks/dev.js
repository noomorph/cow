'use strict';

var gulp = require('gulp');

// Dev Server
gulp.task('dev', ['html', 'sounds', 'styles', 'vendor', 'browserify', 'images', 'watch']);
