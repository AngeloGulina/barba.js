/**
 * Just an object with some helpful functions
 * @type {Object}
 * @namespace Barba.Utils
 */
var Utils = {
  /**
   * Return current url
   * @memberOf Barba.Utils
   * @return {String} currentUrl
   */
  getCurrentUrl: function() {
    return window.location.protocol + '//' +
           window.location.host +
           window.location.pathname +
           window.location.search;
  },

  /**
   * Return a version of the url without the hash
   * @memberOf Barba.Utils
   * @param  {String} url
   * @return {String} newCleanUrl
   */
  cleanLink: function(url) {
    return url.replace(/#.*/, '');
  },

  /**
   * Start an XMLHttpRequest() and return a Promise
   * @memberOf Barba.Utils
   * @param  {String} url
   * @return {Promise}
   */
  xhr: function(url) {
    var deferred = this.deferred();
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (req.status === 200) {
          return deferred.resolve(req.responseText);
        } else {
          return deferred.reject();
        }
      }
    };

    req.open('GET', url);
    req.send();

    return deferred.promise;
  },

  /**
   * Get obj and props and return a new object with the property merged
   * @memberOf Barba.Utils
   * @param  {object} obj
   * @param  {object} props
   * @return {object}
   */
  extend: function(obj, props) {
    var newObj = Object.create(obj);

    for(var prop in props) {
      if(props.hasOwnProperty(prop)) {
        newObj[prop] = props[prop];
      }
    }

    return newObj;
  },

  /**
   * Return a new "Deferred" object
   * https://developer.mozilla.org/en-US/docs/Mozilla/JavaScript_code_modules/Promise.jsm/Deferred
   * @return {Deferred}
   */
  deferred: function() {
    return new function() {
      this.resolve = null;
      this.reject = null;

      this.promise = new Promise(function(resolve, reject) {
        this.resolve = resolve;
        this.reject = reject;
      }.bind(this));
    };
  }
};

module.exports = Utils;
