(function() {

  define(['lib/physics'], function(Physics) {
    return {
      "new": function(params) {
        return {
          x: params.x,
          y: params.y,
          h: params.h,
          w: params.w
        };
      }
    };
  });

}).call(this);
