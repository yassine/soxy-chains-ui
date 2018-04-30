import path from 'path';
import config from '../config/project.config';

export function WithStyleLint(webpackConfilg){
  webpackConfilg.module.rules.push(
    {
      test    : /\.ts(x?)$/,
      include : config.srcPath,
      exclude : /(node_modules|(?:\.spec\.ts(x?)$))/,
      enforce : 'pre',
      use     : {
        loader :'tslint-loader',
        options : {
          configFile: path.join(config.checkStylePath, 'tslint.config.json')
        }
      }
    }
  );
  webpackConfilg.module.rules.push(
    {
      test    : /\.js(x?)$/,
      include : config.srcPath,
      exclude : /(node_modules|(?:\.spec\.js(x?)$))/,
      enforce : 'pre',
      use     : {
        loader :'eslint-loader',
        options : {
          configFile: path.join(config.checkStylePath, 'eslint.config.json')
        }
      }
    }
  );
  return webpackConfilg;
}
