import path from 'path';
import deepmerge from 'deepmerge';
import fs from 'fs';

const root                  = process.cwd(),
      buildDirname          = path.join(root, 'build'),
      srcDirname            = path.join(root, 'src'),
      scriptsDirname        = path.join(srcDirname, 'scripts'),
      appSrcDirname         = path.join(scriptsDirname, 'app'),
      buildConfigDirname    = path.join(buildDirname, 'config'),
      buildGoalsPathDirname = path.join(buildDirname, 'goals'),
      checkStylePathDirname = path.join(buildDirname, 'checkstyle'),
      loaderPathDirname     = path.join(buildDirname, 'loader'),
      styleDirname          = path.join(srcDirname, 'styles'),
      targetPathDirname     = path.join(root, 'dist'),
      themesDirname         = path.join(styleDirname, 'themes');

const defaultConfig = {
  appEntryFile    : path.join(appSrcDirname, 'Main.tsx'),
  appModulesPath  : scriptsDirname,
  buildConfigPath : buildConfigDirname,
  buildGoalsPath  : buildGoalsPathDirname,
  buildPath       : buildDirname,
  checkStylePath  : checkStylePathDirname,
  loaderPath      : loaderPathDirname,
  mainBundleName  : 'starter',
  srcPath         : srcDirname,
  stylesDir       : styleDirname,
  targetPath      : targetPathDirname,
  themesDir       : themesDirname,
  defaultTheme    : 'dark',
  sonarqube       : {
    serverUrl     : 'https://sonarqube.io',
    'sonar.projectKey' : 'com.github.yassine:soxy-chains-ui',
    'sonar.login' : process.env.SONAR_TOKEN,
    'sonar.javascript.lcov.reportPaths' : path.join(process.cwd(), 'reports/coverage/lcov.info'),
    'sonar.typescript.lcov.reportPaths' : path.join(process.cwd(), 'reports/coverage/lcov.info'),
    'sonar.exclusions': 'src/globals.d.ts, **/node_modules/**, reports/**, build/**, **/*.spec.ts, **/*.spec.tsx, **/*.spec.js, **/*.spec.jsx, gulpfile.babel.js',
  }
};

let configOverrides = {};
try{
  fs.accessSync(path.join(__dirname, 'project.config.private-overrides.js'))
  configOverrides = require('./project.config.private-overrides.js').default;
}catch (e){
  //no override file
}

export default deepmerge(defaultConfig, configOverrides);

