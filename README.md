# [Pace.js](http://github.hubspot.com/pace/docs/welcome/) load progress bar for Ember apps, incl. Flash-like initial scripts loading

<img src="https://www.dropbox.com/s/baoswhof2u2wbhd/Screenshot%202015-04-07%2011.30.43.png?dl=1" width="300" />

## Installation

Using latest Ember-cli:

`ember install:addon ember-cli-pace`

Or for older versions:

`npm install ember-cli-pace && ember g pace`

## Flash-like initial script loading

Due to application scripts loading may take some time (especially, using mobile networks or ADSL), Ember-cli-pace can load them asynchronously displaying correctly computed progress bar. To enable that feature, just change `src` attribute to `pace-src` in your `app.html`.

```html
<script pace-src="assets/vendor.js"></script>
<script pace-src="assets/app.js"></script>
```

Therefore, the scripts will be loaded via AJAX requests that allow to [compute loaded vs total bytes ratio](https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress). If your scripts are located on separate host, please bear in mind CORS policy.

## Themes

Pace.js provides [14 progress bar themes](https://github.com/HubSpot/pace/tree/master/themes/black) in [10 colors](https://github.com/HubSpot/pace/tree/master/themes).

To configure theme, append few lines to `config/environment.js`:

```javascript
var ENV = {
  pace: {
    color: 'red', // default: blue
    theme: 'big-counter' // default: minimal
  }
};
```

![Pace.js themes](https://www.dropbox.com/s/d4ladjwfrqq6ehv/Screenshot%202015-04-07%2011.54.48.png?dl=1)


## Pace API

More details on Pace API and configuration could be found on http://github.hubspot.com/pace/

## Developing ember-cli-pace

* `git clone` this repository
* `npm install`
* `bower install`
* `ember server`
* Visit your app at http://localhost:4200.

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
