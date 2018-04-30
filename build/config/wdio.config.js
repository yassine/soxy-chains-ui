//http://webdriver.io/guide/testrunner/configurationfile.html
exports.config = {
  specs: [
    'src/**/*.functional-spec.js'
  ],
  exclude: [
  ],
  capabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        args: ['--headless', '--disable-gpu'],
      }
    }
  ],
  baseUrl   : 'http://localhost:8080',
  framework : 'jasmine',
  afterSuite: function(){
    let http = require('http');
    let obj = browser.execute(
      'return window.__coverage__;'
    );
    let str = JSON.stringify(obj.value);
    let options = {
      port: '9080',
      host: 'localhost',
      path: '/coverage/client',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    let req = http.request(options, res => {
      res.on('data', () => {});
      res.once('end', () => {});
    });
    req.write(str);
    req.end();
  },

  after: function () {
    const http = require('http');
    const fs = require('fs');
    const path = require('path');
    const unzip = require('unzip');
    const reportsDir  = path.join(process.cwd(), 'reports');
    const coverageDir = path.join(reportsDir, 'functional-coverage');
    const coverageArchive = path.join(coverageDir, 'coverage.zip');
    const file = fs.createWriteStream(coverageArchive);

    if (!fs.existsSync(reportsDir)){
      fs.mkdirSync(coverageDir);
    }
    if (!fs.existsSync(coverageDir)){
      fs.mkdirSync(coverageDir);
    }

    return new Promise((success, error) => {
      let req = http.get('http://localhost:9080/coverage/download', function(response) {

        const pipe = response.pipe(file);
        pipe.on('finish', () => {
          file.close();
          success();
        });
        response.on('data', () => {});
        response.on('end', () => {
          req.end();
        });
        response.on('error', () => {
          req.end();
          error();
        });
      });
    });
    //fs.unlinkSync(coverageArchive);
    //unzip the file
  }
};
