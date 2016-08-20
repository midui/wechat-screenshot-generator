/* eslint import/no-extraneous-dependencies:0 */

const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');
const http = require('http');
const ecstatic = require('ecstatic');
const rimraf = require('rimraf');

const webpackConfig = require('./webpack.config.js');

const SITE_DIR = `${__dirname}/src/site/`;
const PUBLIC_DIR = `${__dirname}/public`;
const PORT = 8000;

gulp.task('default', ['build:dev', 'serve']);

gulp.task('clean', (done) => {
  rimraf(`${PUBLIC_DIR}/**`, done);
});

gulp.task('build', ['copyHtmlAndCss', 'copyCNAME', 'webpack']);

gulp.task('build:dev', ['build'], () => {
  gulp.watch('src/**/*', ['build']);
});

gulp.task('copyHtmlAndCss', () => {
  gulp.src('./**/*.html', {
    base: SITE_DIR,
  }).pipe(gulp.dest(PUBLIC_DIR));
  gulp.src('./**/*.css', {
    base: SITE_DIR,
  }).pipe(gulp.dest(PUBLIC_DIR));
});

gulp.task('copyCNAME', () => {
  gulp.src('./CNAME', {
    base: SITE_DIR,
  }).pipe(gulp.dest(PUBLIC_DIR));
});

gulp.task('webpack', (done) => {
  // run webpack
  webpack(webpackConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString());
    done();
  });
});

gulp.task('serve', () => {
  http.createServer(
    ecstatic({ root: PUBLIC_DIR })
  ).listen(PORT);

  console.log(`Listening on :${PORT}`);
});
