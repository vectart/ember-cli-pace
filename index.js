/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');

var _pacePath, _paceConfig;
var _defaultPaceConfig = {
  color: 'blue',
  theme: 'minimal'
};

module.exports = {
  name: 'ember-cli-pace',

  config: function (environment, baseConfig) {
    if ('pace' in baseConfig) {
      _paceConfig = baseConfig.pace;
    } else {
      _paceConfig = {};
    }

    _paceConfig.color = _paceConfig.color || _defaultPaceConfig.color;
    _paceConfig.theme = _paceConfig.theme || _defaultPaceConfig.theme;

    if (environment === 'development') {
      return {
        pace: _paceConfig,
        contentSecurityPolicy: {
          'script-src': "'self' 'unsafe-eval' 'unsafe-inline'"
        }
      };
    }
  },

  included: function (app) {
    this._super.included(app);

    _pacePath = path.join(app.bowerDirectory, 'pace');

    if (_paceConfig) {
      var themePath = path.join(_pacePath, 'themes', _paceConfig.color, 'pace-theme-' + _paceConfig.theme + '.css');
      app.import(themePath);
    }
  },

  contentFor: function (name) {
    if (name === 'head') {
      var paceScriptPath = path.join(_pacePath, 'pace.min.js'),
          addonScriptPath = path.resolve(__dirname, 'addon', 'script-loader.js'),
          paceScript = fs.readFileSync(paceScriptPath, 'utf8'),
          addonScript = fs.readFileSync(addonScriptPath, 'utf8');

      return '<script type="text/javascript">' + paceScript + ';\n' + addonScript + '</script>';
    }
  }
};
