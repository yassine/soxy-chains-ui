import gulp from 'gulp';
import path from 'path';
import projectConfig from 'project.config';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { WebpackConfigProvider } from 'webpack/webpack.config';
import { WithStylesConfiguration } from 'webpack/styles.config';
import { WithInstrumentation } from 'webpack/istanbul.config';
import {Launcher} from 'webdriverio';
import http from 'http';
import express from 'express';
import istanbulMiddleware from 'istanbul-middleware';

gulp.task('functional-test', (callback) => {
  const app = express();
  const httpServer = http.createServer(app);
  const config = WithInstrumentation(WithStylesConfiguration(WebpackConfigProvider(false)));
  const wdio      = new Launcher(path.join(projectConfig.buildConfigPath, 'wdio.config.js'), { logLevel: 'verbose' });
  const devServer = new WebpackDevServer(webpack(config), {
    contentBase : [projectConfig.srcPath, projectConfig.targetPath],
    hot         : false,
    publicPath  : '/assets/',

  });

  app.use('/coverage', istanbulMiddleware.createHandler());

  (async function() {
    await httpServer.listen(9080);
  })();

  devServer.listen(8080, 'localhost');

  return wdio.run()
    .then(() => {
      devServer.close();
      httpServer.close();
      callback();
      process.exit(0);
    }, () => {
      devServer.close();
      httpServer.close();
      callback();
      process.exit(1);
    });
});
