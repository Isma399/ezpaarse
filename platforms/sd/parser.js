#!/usr/bin/env node

// ##EZPAARSE

/*jslint node: true, maxlen: 100, maxerr: 50, indent: 2 */
'use strict';
var byline      = require('byline');
var URL         = require('url');
var querystring = require('querystring');

function parseUrl(url) {
  var result  = {};
  var param   = querystring.parse(URL.parse(url).query);
  var match;
  
  if (param._ob) {
    if (param._cdi) {
      result.pid = param._cdi;
    }
    switch (param._ob) {
    case 'IssueURL':
      // The CDI is the 2nd parameter of _tockey (params separated by '#')
      var arg = param._tockey.split('#');
      result.pid = arg[2];
      // Set consultation type to TableOfContent (TOC)
      result.rtype = 'TOC';
      result.mime = 'MISC';
      break;
    case 'ArticleURL':
      // Summary of full text
      if (param._fmt) {
        switch (param.fmt) {
        case 'summary':
          // Set consultation type to Summary
          result.rtype = 'ABS';
          result.mime = 'MISC';
          break;
        case 'full':
          // Set consultation type to Text
          result.rtype = 'ARTICLE';
          result.mime = 'HTML';
          break;
        }
      }
      break;
    case 'MImg':
      // PDF
      // Set consultation type to PDF
      result.rtype = 'ARTICLE';
      result.mime = 'PDF';
      break;
    case 'MiamiImageURL':
      if (param._pii) {
        if ((match = /S([0-9]{4})([0-9]{3}[0-9Xx])/.exec(param._pii)) !== null) {
          result.issn = match[1] + '-' + match[2];
          result.rtype = 'ARTICLE';
          result.mime = 'PDF';
        } else if ((match = /B([0-9]{12})([0-9Xx])/.exec(param._pii)) !== null) {
          result.pid = match[1] + match[2];
          result.rtype = 'BOOK';
          result.mime = 'PDF';
        } else {
          result.issn = param._pii.substr(1, 4) + '-' + param._pii.substr(5, 4);
          // Set consultation type to PDF
          result.rtype = 'ARTICLE';
          result.mime = 'PDF';
        }
      }
      break;
    case 'DocumentDeliveryURL':
      // Order
      // Set consultation type to Order
      result.rtype = 'ORDER';
      result.mime = 'MISC';
      break;
    default:
      // Unknown case, skip
      // Set Qualification to FALSE
      result.qualification = false;
      break;
    }
  } else {
    if ((match = /\/science\/article\/pii\/S([0-9]{4})([0-9]{3}[0-9Xx])/.exec(url)) !== null) {
      result.issn = match[1] + '-' + match[2];
      result.rtype = 'ARTICLE';
      result.mime = 'HTML';
    } else if ((match = /\/science\/publication\?issn=([0-9]{4})([0-9]{4})/.exec(url)) !== null) {
      result.issn = match[1] + '-' + match[2];
      result.rtype = 'TOC';
      result.mime = 'MISC';
    } else if ((match = /\/science\/journal\/([0-9]{4})([0-9]{4})/.exec(url)) !== null) {
      result.issn = match[1] + '-' + match[2];
      result.rtype = 'TOC';
      result.mime = 'MISC';
    } else if ((match = /\/science\/bookseries\/([0-9]{8})/.exec(url)) !== null) {
      result.pid   = match[1];
      result.rtype = 'BOOKSERIE';
      result.mime = 'MISC';
    } else if ((match = /\/science\/handbooks\/([0-9]{8})/.exec(url)) !== null) {
      result.pid   = match[1];
      result.rtype = 'HANDBOOK';
      result.mime = 'MISC';
    } else if ((match = /\/science\/book\/([0-9]{13})/.exec(url)) !== null) {
      result.pid   = match[1];
      result.rtype = 'BOOK';
      result.mime = 'HTML'
    }
  }
  return result;
}

/*
* If an array of urls is given, return an array of results
* Otherwise, read stdin and write into stdout
*/
exports.parserExecute = function (urls) {

  if (urls && Array.isArray(urls)) {
    var results = [];
    for (var i = 0, l = urls.length; i < l; i++) {
      results.push(parseUrl(urls[i]));
    }
    return results;
  } else {
    var stdin = process.stdin;
    var stdout = process.stdout;
    var stream = byline.createStream(stdin);

    stream.on('end', function () {
      process.exit(0);
    });

    stream.on('close  ', function () {
      process.exit(0);
    });

    stream.on('data', function (line) {
      stdout.write(JSON.stringify(parseUrl(line)) + '\n');
    });
  }
}

if (!module.parent) {
  var optimist = require('optimist')
    .usage('Parse URLs read from standard input. ' +
      'You can either use pipes or enter URLs manually.' +
      '\n  Usage: $0' +
      '\n  Example: cat urls.txt | $0');
  var argv = optimist.argv;

  // show usage if --help option is used
  if (argv.help || argv.h) {
    optimist.showHelp();
    process.exit(0);
  }

  exports.parserExecute();
}
