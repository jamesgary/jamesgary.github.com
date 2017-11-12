(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['lib/physics/polygon'], function(Platform) {
    var Lava;
    return Lava = (function(_super) {

      __extends(Lava, _super);

      function Lava() {
        return Lava.__super__.constructor.apply(this, arguments);
      }

      return Lava;

    })(Platform);
  });

}).call(this);
