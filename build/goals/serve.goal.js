import gulp from 'gulp';
import webpack from 'webpack';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import WebpackDevServer from 'webpack-dev-server';
import { WebpackConfigProvider } from 'webpack/webpack.config';
import { WithStylesConfiguration } from 'webpack/styles.config';
import { WithTools } from 'webpack/tools.config';
import projectConfig from 'project.config';

gulp.task('serve', function () {
  const config = WithTools(WithStylesConfiguration(WebpackConfigProvider()));
  config.mode  = 'development';
  const browserSyncPlugin = new BrowserSyncPlugin(
    {
      host: 'localhost',
      port: 9000,
      proxy: {
        target: 'http://localhost:8080/'
      },
      browser: 'firefox',
      open: false,
    },
    {
      reload: true
    }
  );
  config.plugins.push(browserSyncPlugin);

  new WebpackDevServer(webpack(config), {
    contentBase : [projectConfig.srcPath, projectConfig.targetPath],
    hot         : false,
    publicPath  : '/assets/',
  }).listen(8080, 'localhost', function() {

  });
});
