#!/usr/bin/env node

var argv = require('yargs').argv;
var fs = require('fs');
var glob = require('glob');
var path = require('path');
var purify = require('purify-css');

var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

var args = argv._;

function purifyFile() {
  var filePaths = glob.sync('node_modules/' + args[1] + '/**/*.css')
    .filter(function (filePath) {
      // Ignore minified files.
      return filePath.indexOf('.min') === -1;
    });
  var selectedSelectors = args.slice(2);
  var purifyOptions = {
    output: './purified.css',
    whitelist: selectedSelectors
  };

  purify('', filePaths, purifyOptions);
  console.log('Installed:', selectedSelectors);
}

if (args[0] === 'install') {
  exec('npm install ' + args[1], function (error, stdout, stderr) {
    puts(error, stdout, stderr);

    if (!error) {
      purifyFile();
    }
  });
}
