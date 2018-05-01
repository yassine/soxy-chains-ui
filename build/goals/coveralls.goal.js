import gulp from 'gulp';
import coveralls from 'gulp-coveralls';
import path from 'path';

gulp.task('coveralls', function(){
  return gulp.src(path.join(process.cwd(), 'reports', 'coverage', 'lcov.info'))
          .pipe(coveralls());
});
