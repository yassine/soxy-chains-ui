import gulp from 'gulp';
import fs from 'fs';
import unzip from 'unzip';
import path from 'path';
import istanbulCombine from 'istanbul-combine';

gulp.task('coverage', function(){
  const reportsDir  = path.join(process.cwd(), 'reports');
  const coverageDir = path.join(reportsDir, 'functional-coverage');
  const coverageArchive = path.join(coverageDir, 'coverage.zip');
  return new Promise((ok, nok) => {
    fs.createReadStream(coverageArchive)
      .pipe(unzip.Parse())
      .on('entry', (entry) => {
        if(entry.path === 'coverage.json'){
          entry.pipe(fs.createWriteStream(path.join(process.cwd(), 'reports', 'functional-coverage', 'coverage.json')))
        }
      }).on('error', () => {
        nok();
      }).on('finish', () => {
        istanbulCombine.sync({
          dir : 'reports/coverage',
          pattern : ['reports/*-coverage/coverage.json', 'reports/*-coverage/coverage*.json'],
          print : 'summary',
          reporters: {
            lcov: {}
          }
        });
        ok();
      });
  });
});
