import config from 'project.config';
import path from 'path';
import webpack from 'webpack';

const entries = {};
entries[config.mainBundleName] = 'scripts/Main.tsx';

const typescriptLoaders = [
  {
    loader: 'babel-loader'
  },
  {
    loader: 'ts-loader',
    options:{
      transpileOnly:true
    }
  },
  {
    loader:'tslint-loader',
    options:{
      configFile: path.join(config.checkStylePath, 'tslint.config.json')
    }
  }
];
const jsLoaders = [
  {
    loader  : 'babel-loader'
  },
  {
    loader  : 'eslint-loader',
    options : {
      configFile: path.join(config.checkStylePath, 'eslint.config.json')
    }
  }
];

export function WebpackConfigProvider() {
  return {
    context : config.srcPath,
    devtool : 'source-map',
    entry   : entries,
    output  : {
      filename      : '[name].bundle.js',
      chunkFilename : '[name].[chunkhash].chunk.js',
      publicPath    : '/assets/',
      path          : config.targetPath,
    },
    module: {
      rules : [
        {
          test    : /\.ts(x?)$/,
          exclude : /(node_modules|\.spec\.ts(x?)$)/,
          use     : typescriptLoaders.concat([{
            loader: 'istanbul-instrumenter-loader',
            options:{
              enforce: 'post',
              esModules: true
            }
          }])
        },
        {
          test    : /\.ts(x?)$/,
          exclude : [/(node_modules)/],
          use     : typescriptLoaders.slice()
        },
        {
          test    : /\.js(x?)$/,
          exclude: /(node_modules|\.spec\.js(x?)$)/,
          use     : jsLoaders.concat([{
            loader: 'istanbul-instrumenter-loader',
            options:{
              enforce: 'post',
              esModules: true
            }
          }])
        },
        {
          test    : /\.js(x?)$/,
          exclude : [/(node_modules)/],
          use     : jsLoaders
        }
      ]
    },
    devServer: {
      inline: true,
      keepalive: false
    },
    plugins: [
      new webpack.ProvidePlugin({
        'React' : 'react'
      })
    ],
    resolve: {
      extensions : [
        '.js', '.jsx', '.ts', '.tsx', '.scss'
      ],
      modules : [
        'src', 'src/scripts/ui', 'src/scripts/app',
        'src/scripts', 'src/styles', 'build/loader',
        'node_modules'
      ]
    }
  }
}
