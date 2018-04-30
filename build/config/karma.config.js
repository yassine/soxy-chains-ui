// Karma configuration
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import { WebpackConfigProvider } from 'webpack/webpack.config';
import { WithStylesConfiguration } from 'webpack/styles.config';
import { WithInstrumentation } from 'webpack/istanbul.config';

const webpackConfiguration = Object.assign({}, WithInstrumentation(WithStylesConfiguration(WebpackConfigProvider())), {
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  devServer: void 0,
});

module.exports = function(config) {
  config.set({
    plugins: [
      'karma-coverage-istanbul-reporter',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-jasmine',
      'karma-chrome-launcher'
    ],
    webpack: webpackConfiguration,
    preprocessors: {
      'src/**/*.spec.js' : ['webpack', 'sourcemap'],
      'src/**/*.spec.ts' : ['webpack', 'sourcemap'],
      'src/**/*.spec.tsx': ['webpack', 'sourcemap'],
      'src/**/*.spec.jsx': ['webpack', 'sourcemap'],
    },
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: process.cwd(),
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],
    // list of files / patterns to load in the browser
    files: [
      'node_modules/babel-polyfill/browser.js',
      'src/**/*.spec.js',
      'src/**/*.spec.jsx',
      'src/**/*.spec.tsx',
      'src/**/*.spec.ts',
    ],
    // list of files to exclude
    exclude: [
    ],
    client: {
      captureConsole: true,
    },
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [ 'coverage-istanbul' ],
    // web server port
    port: 9876,
    // enable / disable colors in the output (reporters and logs)
    colors: true,
    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],// Chrome, Firefox, PhantomJS
    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
    //https://github.com/mattlewis92/karma-coverage-istanbul-reporter
    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
      reports: ['lcov', 'json'],
      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(process.cwd(), 'reports', 'unit-coverage'),
      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,
      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,
      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      skipFilesWithNoCoverage: true,
      // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {

      },
      // enforce percentage thresholds
      // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode
    }
  })
};
