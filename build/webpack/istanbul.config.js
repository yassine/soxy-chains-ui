import config from 'project.config';

export function WithInstrumentation(webpackConfig){
  webpackConfig.module.rules.push(
    {
      test    : /\.[tj]s(x?)$/i,
      include : config.srcPath,
      exclude : /(node_modules|(?:spec\.[tj]s(x?)$))/,
      enforce : 'pre',
      use     : {
        loader: 'istanbul-instrumenter-loader',
        options:{
          esModules: true
        }
      }
    }
  );
  return webpackConfig;
}
