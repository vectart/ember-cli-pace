# [Pace.js](http://github.hubspot.com/pace/docs/welcome/) load progress bar for Ember apps, incl. initial scripts lazy loading

<img src="https://www.dropbox.com/s/baoswhof2u2wbhd/Screenshot%202015-04-07%2011.30.43.png?dl=1" width="240" />

[![Downloads](http://img.shields.io/npm/dm/ember-cli-pace.svg?style=flat-square)](https://npmjs.org/package/ember-cli-pace) [![Code Climate](https://img.shields.io/codeclimate/github/vectart/ember-cli-pace.svg?style=flat-square)](https://codeclimate.com/github/vectart/ember-cli-pace) [![Ember Observer Score](http://emberobserver.com/badges/ember-cli-pace.svg?style=flat-square)](http://emberobserver.com/addons/ember-cli-pace) [![David Dependencies](https://david-dm.org/vectart/ember-cli-pace.svg?style=flat-square)](https://david-dm.org/vectart/ember-cli-pace)
# [Demo &#10140;](http://vectart.github.io/ember-cli-pace/)

## Installation

Using latest Ember-cli, run the command:

`ember install ember-cli-pace`

or for older versions:

`npm install ember-cli-pace && ember g pace`

## Flash-like initial script loading

Due to application scripts loading may take some time (especially, using mobile networks or ADSL), Ember-cli-pace can load them asynchronously displaying correctly computed progress bar. To enable that feature, just change `src` attribute to `pace-src` in your `app.html`.

```html
<script pace-src="assets/vendor.js"></script>
<script pace-src="assets/app.js"></script>
```

Therefore, the scripts will be loaded via AJAX, which allows to [compute loaded vs total bytes ratio](https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress). If your scripts are located on separate host, please note CORS policy.

## Configuration

All options, excluding `color` and `theme` related to the addon, are documented on [http://github.hubspot.com/pace/](http://github.hubspot.com/pace/#configuration).

```javascript
var ENV = {
  pace: {
  
    // addon-specific options to configure theme
    theme: 'material',
    color: 'blue',
    
    // pace-specific options
    // learn more on http://github.hubspot.com/pace/#configuration
    catchupTime: 50,
    initialRate: .01,
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
  }
};
```

## Themes

This addon is bundled with Material spinner theme, which is set by default. See it on [demo page](http://vectart.github.io/ember-cli-pace/).

Pace.js originally provides [14 progress bar themes](https://github.com/HubSpot/pace/tree/master/themes/black) in [10 colors](https://github.com/HubSpot/pace/tree/master/themes). See the progress bars and spinners in action: http://github.hubspot.com/pace/docs/welcome/

![Pace.js themes](https://www.dropbox.com/s/d4ladjwfrqq6ehv/Screenshot%202015-04-07%2011.54.48.png?dl=1)

## Pace API

More details on Pace events, methods and configuration could be found on http://github.hubspot.com/pace/

## Developing ember-cli-pace

* `git clone` this repository
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
