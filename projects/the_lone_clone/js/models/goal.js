(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['lib/physics/circle'], function(Circle) {
    var GOAL_RAD, Goal;
    GOAL_RAD = .01;
    return Goal = (function(_super) {

      __extends(Goal, _super);

      function Goal(circleData) {
        circleData.r = GOAL_RAD;
        circleData.isStatic = true;
        Goal.__super__.constructor.call(this, circleData);
      }

      return Goal;

    })(Circle);
  });

}).call(this);
