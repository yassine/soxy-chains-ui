import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';

export function WithTools(webpackConfig){
  webpackConfig.plugins = webpackConfig.plugins || [];
  webpackConfig.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'server',
    analyzerHost: '127.0.0.1',
    analyzerPort: 8888,
    openAnalyzer: false,
  }));
  return webpackConfig;
}
