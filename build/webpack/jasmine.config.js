import path from 'path';
import config from 'project.config';
import JasmineWebpackPlugin from 'jasmine-webpack-plugin'

export default {
  entry: [
    path.join(config.srcPath, 'src', 'scripts', 'Main.functional-spec.js')
  ],
  plugins: [ new JasmineWebpackPlugin() ]
};
