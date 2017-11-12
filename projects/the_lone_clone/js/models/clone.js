(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['lib/physics/circle'], function(Circle) {
    var CLONE_GROW_RATE, CLONE_START_RAD, Clone;
    CLONE_START_RAD = .2;
    CLONE_GROW_RATE = .05;
    return Clone = (function(_super) {

      __extends(Clone, _super);

      function Clone(circleData, parent) {
        this.parentRad = parent.r();
        circleData.r = CLONE_START_RAD * this.parentRad;
        Clone.__super__.constructor.call(this, circleData);
      }

      Clone.prototype.spike = function() {
        this.spiked = this.dead = true;
        return this.freeze();
      };

      Clone.prototype.melt = function() {
        return this.melted = this.dead = true;
      };

      Clone.prototype.update = function() {
        Clone.__super__.update.call(this);
        if (!this.dead) {
          return this.grow();
        }
      };

      Clone.prototype.grow = function() {
        var newRad, r;
        r = this.r();
        if (r < this.parentRad) {
          newRad = r + CLONE_GROW_RATE;
          if (newRad > this.parentRad) {
            newRad = this.parentRad;
          }
          return this.r(newRad);
        }
      };

      return Clone;

    })(Circle);
  });

}).call(this);
