(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['lib/physics/circle'], function(Circle) {
    var DEFAULT_GHOST_RAD, DEFAULT_SPEED, Ghost;
    DEFAULT_GHOST_RAD = .2;
    DEFAULT_SPEED = .04;
    return Ghost = (function(_super) {

      __extends(Ghost, _super);

      function Ghost(circleData, target) {
        this.target = target;
        this.speed = DEFAULT_SPEED;
        circleData.r = DEFAULT_GHOST_RAD;
        circleData.isStatic = true;
        Ghost.__super__.constructor.call(this, circleData);
      }

      Ghost.prototype.update = function() {
        return this.chaseTarget();
      };

      Ghost.prototype.gigafy = function() {
        this.r(.5);
        return this.speed = .01;
      };

      Ghost.prototype.chaseTarget = function() {
        var dx, dy, radians, targetX, targetY, x, xSpeed, y, ySpeed;
        targetX = this.target.x();
        targetY = this.target.y();
        x = this.x();
        y = this.y();
        dx = targetX - x;
        dy = targetY - y;
        radians = Math.atan2(dx, dy);
        xSpeed = Math.sin(radians) * this.speed;
        ySpeed = Math.cos(radians) * this.speed;
        this.x(x + xSpeed);
        return this.y(y + ySpeed);
      };

      return Ghost;

    })(Circle);
  });

}).call(this);
