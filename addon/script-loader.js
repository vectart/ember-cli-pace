(function () {

  var scriptContents = [],
      remain;

  var paceScripts = function () {
    var scripts = document.querySelectorAll('script[pace-src]'),
        len = scripts.length;

    remain = len;

    for (var i = 0; i < len; i++) {
      getScript.call(this, i, scripts[i].getAttribute('pace-src'), processScript);
    }

    scripts = null;
  };

  var processScript = function (index, content) {
    remain--;
    scriptContents[index] = content || '';

    if (remain === 0) {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.text = scriptContents.join(';\n\n');
      document.querySelector('body').appendChild(script);

      scriptContents = null;
      script = null;
      remain = null;
    }
  };

  // http://youmightnotneedjquery.com/

  var ready = function (fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', function() {
        if (document.readyState !== 'loading') {
          fn();
        }
      });
    }
  };

  var getScript = function (index, url, callback) {
    var request = new XMLHttpRequest();

    request.open('GET', url, true);

    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          var responseURL = this.responseURL,
              text = this.responseText;

          text = text.replace(/sourceMappingURL\=/gm, function (prefix) {
            return prefix + responseURL + '/../';
          });
          callback(index, text);
        } else {
          callback(index);
        }
      }
    };

    request.send();
    request = null;
  };

  ready(paceScripts);

})();
