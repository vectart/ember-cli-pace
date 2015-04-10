import Ember from 'ember';

export default Ember.Controller.extend(Ember.PromiseProxyMixin, {
  page: 0,

  actions: {
    load: function () {
      var promise = $.ajax({
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/cat=movies",
        type: 'post',
        dataType: 'json',
        headers: {
          "X-Mashape-Key": "NmMfD3pY9dmshv8ZpOelB8xlmiOPp1JDlGtjsnwdRZKZ1cLgJn",
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      });

      this.set('promise', promise);
    }
  }
});
