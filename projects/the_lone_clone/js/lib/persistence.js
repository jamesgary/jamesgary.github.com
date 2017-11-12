(function() {

  define(function() {
    return {
      get: function(dataName) {
        return JSON.parse(localStorage.getItem(dataName));
      },
      set: function(dataName, data) {
        return localStorage.setItem(dataName, JSON.stringify(data));
      }
    };
  });

}).call(this);
