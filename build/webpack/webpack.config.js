import config from 'project.config';
import webpack from 'webpack';

const entries = {};
entries[config.mainBundleName] = 'scripts/Main.tsx';

function typeScriptLoadersProvider(){
  return [
    {
      loader: 'babel-loader'
    },
    {
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }
  ];
}

function javaScriptLoadersProvider(){
  return [
    {
      loader: 'babel-loader'
    }
  ];
}

export function WebpackConfigProvider() {
  return {
    context : config.srcPath,
    devtool : 'source-map',
    entry   : entries,
    mode    : 'development',
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
          include : [config.srcPath, config.testDir] ,
          exclude : [/(node_modules)/],
          use     : typeScriptLoadersProvider().slice()
        },
        {
          test    : /\.js(x?)$/,
          include : [config.srcPath, config.testDir] ,
          exclude : [/(node_modules)/],
          use     : javaScriptLoadersProvider().slice()
        }
      ]
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
        'test', 'test/unit-tests',
        'src', 'src/scripts/ui', 'src/scripts/app',
        'src/scripts', 'src/styles', 'build/loader',
        'node_modules'
      ]
    }
  }
}
