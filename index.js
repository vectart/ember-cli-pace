/* eslint-env node */
'use strict';

const fs = require('fs');
const path = require('path');
const UglifyJS = require("uglify-js");
const fastbootTransform = require('fastboot-transform');

const PACE_DIR = 'pace-progress';
const ADDON_PACE_DIR = 'ember-cli-pace';

let _paceConfig = {};
const _defaultPaceConfig = {
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
  options: {
    nodeAssets: {
      'pace-progress': {
        vendor: {
          srcDir: '',
          include: ['pace.js', 'themes/**'],
          processTree(input) {
            return fastbootTransform(input);
          }
        }
      }
    }
  },

  config(environment, baseConfig) {
    if ('pace' in baseConfig) {
      if (!baseConfig.pace) {
        _paceConfig = false;
      } else {
        _paceConfig = Object.assign({}, _defaultPaceConfig, baseConfig.pace);
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

  contentFor(name) {
    if (_paceConfig && name === 'head') {
      let paceScriptPath = path.join('node_modules', PACE_DIR, 'pace.js'),
        addonScriptPath = path.resolve(__dirname, 'vendor', ADDON_PACE_DIR, 'script-loader.js'),
        paceScript, addonScript;

      paceScript = fs.readFileSync(paceScriptPath, 'utf8');
      addonScript = fs.readFileSync(addonScriptPath, 'utf8');

      if (this.app.env === 'production') {
        paceScript = UglifyJS.minify(paceScript).code;
        addonScript = UglifyJS.minify(addonScript).code;
      }

      let paceOptions = `window.paceOptions = ${JSON.stringify(_paceConfig, null, 2)};`;

      return `<script type="text/javascript">
  ${paceOptions}

  ${paceScript}

  ${addonScript}
</script>`;
    }
  },
  included() {
    this._super.included.apply(this, arguments);
    this._ensureThisImport();

    let paceThemeName = path.join(_paceConfig.color, 'pace-theme-' + _paceConfig.theme + '.css'),
      originalPaceThemePath = path.join('vendor', PACE_DIR, 'themes', paceThemeName),
      addonPaceThemePath = path.join('vendor', ADDON_PACE_DIR, 'themes', paceThemeName);

    if (fs.existsSync(addonPaceThemePath)) {
      this.import(addonPaceThemePath);
    } else {
      this.import(originalPaceThemePath);
    }
  },
  _ensureThisImport() {
    if (!this.import) {
      this._findHost = function findHostShim() {
        let current = this;
        let app;

        do {
          app = current.app || app;
        } while (current.parent.parent && (current = current.parent));
        return app;
      };
      this.import = function importShim(asset, options) {
        let app = this._findHost();
        app.import(asset, options);
      };
    }
  },
  isDevelopingAddon() {
    return true;
  }
};
