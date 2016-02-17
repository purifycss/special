#!/usr/bin/env node

var argv = require('yargs').argv;
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var purify = require('purify-css');

var sys = require('sys')
var exec = require('child_process').exec;

var args = argv._;

function puts(error, stdout, stderr) {
  sys.puts(stdout);
}

function purifyFile(packageName, options) {
  var filePaths = glob.sync('**/node_modules/' + packageName + '/**/*.css')
    .filter(function (filePath) {
      // Ignore minified files.
      return filePath.indexOf('.min') === -1;
    });

  console.log('Installed:', options.whitelist, 'from', packageName);
  return purify('', filePaths, options);
}

function installPackage(packageName, cb) {
  exec('npm install ' + packageName, cb);
}

if (args[0] === 'install') {

  if (args[1]) {
    var packageName = args[1];
    var selectedSelectors = args.slice(2);
    installPackage(packageName, function (error, stdout, stderr) {
      puts(error, stdout, stderr);

      if (!error) {
        purifyFile(packageName, {
          output: './special.css',
          whitelist: selectedSelectors
        });
      }
    });
  } else {
    if (fs.existsSync('./special.config.js')) {
      var config = require('./special.config.js');
      var packages = config.packages;
      var purified = '';
      var finishCount = 0;
      var packagesCount  = Object.keys(packages).length;

      var tasks = Object.keys(packages).forEach(function (packageName) {
        var purifyOptions = {
          whitelist: packages[packageName].selectors
        };

        installPackage(packageName, function () {
          purified = purified + '\n\n/* break */\n\n' + purifyFile(packageName, purifyOptions);
          finishCount++;
          if (finishCount === packagesCount) {
            fs.writeFile('./special.css', purified, function (err) {
              if (err) {
                return err;
              }
            });
          }
        });
      });

    }

  }

}
