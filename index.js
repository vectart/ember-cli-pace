/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var UglifyJS = require("uglify-js");

var _paceConfig = {};
var _defaultPaceConfig = {
  color: 'blue',
  theme: 'minimal',
  catchupTime: 50,
  initialRate: 0.01,
  minTime: 100,
  ghostTime: 50,
  maxProgressPerFrame: 20,
  easeFactor: 1.25,
  startOnPageLoad: true,
  restartOnPushState: true,
  restartOnRequestAfter: 500,
  target: 'body',
  elements: {
    checkInterval: 100,
    selectors: ['body', '.ember-view']
  },
  eventLag: {
    minSamples: 10,
    sampleCount: 3,
    lagThreshold: 3
  },
  ajax: {
    trackMethods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    trackWebSockets: true,
    ignoreURLs: []
  }
};


module.exports = {
  name: 'ember-cli-pace',

  config: function (environment, baseConfig) {
    if ('pace' in baseConfig) {
      if (!baseConfig.pace) {
        _paceConfig = false;
      } else {
        Object.keys(_defaultPaceConfig).forEach(function (key) {
          _paceConfig[key] = baseConfig.pace.hasOwnProperty(key) ? baseConfig.pace[key] : _defaultPaceConfig[key];
        });
      }
    } else {
      _paceConfig = _defaultPaceConfig;
    }

    if (environment === 'development') {
      return {
        pace: _paceConfig,
        contentSecurityPolicy: {
          'script-src': "'self' 'unsafe-eval' 'unsafe-inline'"
        }
      };
    }

    return {
      pace: _paceConfig
    };
  },

  treeFor: function (name) {
    if (_paceConfig && name === 'styles') {
      var paceThemeName = path.join(_paceConfig.color, 'pace-theme-' + _paceConfig.theme + '.css'),
          originalPaceThemePath = path.join(this.app.bowerDirectory, 'pace', 'themes', paceThemeName),
          addonPaceThemePath = path.join('vendor', 'ember-cli-pace', 'themes', paceThemeName);

      if (fs.existsSync(originalPaceThemePath)) {
        this.app.import(originalPaceThemePath);
      } else if (fs.existsSync(addonPaceThemePath)) {
        this.app.import(addonPaceThemePath);
      } else {
        throw new Error('Pace theme CSS file was not found: ' + paceThemeName);
      }
    }
  },

  contentFor: function (name) {
    if (_paceConfig && name === 'head') {
      var paceScriptPath = path.join(this.app.bowerDirectory, 'pace', 'pace.js'),
          addonScriptPath = path.resolve(__dirname, 'vendor', 'ember-cli-pace', 'script-loader.js'),
          paceScript, addonScript;

      if (this.app.env === 'production') {
        paceScript = UglifyJS.minify(paceScriptPath).code;
        addonScript = UglifyJS.minify(addonScriptPath).code;
      } else {
        paceScript = fs.readFileSync(paceScriptPath, 'utf8');
        addonScript = fs.readFileSync(addonScriptPath, 'utf8');
      }

      return '<script type="text/javascript" data-pace-options=\'' + JSON.stringify(_paceConfig) + '\'>' + paceScript + ';\n' + addonScript + '</script>';
    }
  }
};
