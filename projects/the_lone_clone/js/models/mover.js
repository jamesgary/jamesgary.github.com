(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['lib/physics/polygon'], function(Platform) {
    var Mover, SPEED;
    SPEED = 3;
    return Mover = (function(_super) {

      __extends(Mover, _super);

      function Mover() {
        return Mover.__super__.constructor.apply(this, arguments);
      }

      Mover.prototype.update = function() {
        if (this.rising && this.y() < this.minHeight) {
          this.rising = false;
        } else if (!this.rising && this.y() > this.maxHeight) {
          this.rising = true;
        }
        if (this.rising) {
          return this.transform({
            y: -SPEED
          });
        } else {
          return this.transform({
            y: SPEED
          });
        }
      };

      return Mover;

    })(Platform);
  });

}).call(this);
