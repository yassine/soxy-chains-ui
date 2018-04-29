import path from 'path';
import projectConfig from 'project.config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import md5 from 'md5';
import * as loaderUtils from 'loader-utils';
import jsonImporter from 'node-sass-json-importer';

export function WithStylesConfiguration(webpackConfig) {

  const includePaths = [
    path.join(projectConfig.themesDir, projectConfig.defaultTheme),
    path.join(projectConfig.srcPath, 'scripts', 'app'),
    path.join(projectConfig.srcPath, 'scripts', 'ui'),
    path.join(projectConfig.srcPath, 'styles')
  ];

  webpackConfig.module.rules = webpackConfig.module.rules || [];
  webpackConfig.plugins = webpackConfig.plugins || [];

  const plugin = new ExtractTextPlugin({
    filename  : 'styles.css',
    allChunks : true
  });
  // noinspection JSUnresolvedFunction
  const loaderConfig = {
    test: /\.scss$/,
    //exclude : /\.theme\.scss$/,
    use: plugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader  : 'css-loader',
          options : {
            importLoaders : 1,
            modules   : true,
            sourceMap : true,
            localIdentName : '[path][name]',
            getLocalIdent
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths,
            sourceMap: true,
            importer: jsonImporter,
          }
        }
      ],
    })
  };

  const themeExtractPlugin = new ExtractTextPlugin({
    filename  : `${projectConfig.defaultTheme}-theme.css`,
    allChunks : true
  });

  const themeLoaderConfig = {
    test : /\.theme\.scss$/,
    use  : themeExtractPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader  : 'css-loader',
          options : {
            importLoaders : 1,
            modules   : true,
            sourceMap : true,
            localIdentName : '[path][name]',
            getLocalIdent
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths,
            sourceMap: true
          }
        }
      ],
    })
  };

  webpackConfig.plugins.push(themeExtractPlugin);
  webpackConfig.module.rules.push(themeLoaderConfig);
  webpackConfig.plugins.push(plugin);
  webpackConfig.module.rules.push(loaderConfig);

  return webpackConfig;

}

function getLocalIdent(context, localIdentName, localName, options){
  // noinspection JSUnresolvedFunction
  let interpolated = loaderUtils.interpolateName(context, localIdentName, options),
      path         = interpolated.replace(/\.((theme)|(style))$/g,'');
  // noinspection JSUnresolvedFunction
  return `${localName}-${md5(path).substring(0,5)}`;
}
