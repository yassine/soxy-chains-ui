import gulp from 'gulp';
import path from 'path';
import env from 'gulp-env';
import projectConfig from 'project.config';

import {Server} from 'karma';

gulp.task('test',function(done){
  env({
    vars:{
      CHROME_BIN:'/usr/bin/chromium-browser'
    }
  });
  new Server({
    configFile : path.join(projectConfig.buildConfigPath, 'karma.config.js'),
    singleRun  : true
  }, done).start()
});
