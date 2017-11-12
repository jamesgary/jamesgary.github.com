(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['models/platform', 'lib/physics/physics'], function(Polygon, Physics) {
    var Spikes;
    return Spikes = (function(_super) {

      __extends(Spikes, _super);

      function Spikes(lineData) {
        this.x1 = lineData[0].x;
        this.y1 = lineData[0].y;
        this.x2 = lineData[1].x;
        this.y2 = lineData[1].y;
        this.physicalPolygon = Physics.addStaticPolygon(lineData);
        this.physicalPolygon.userdata = this;
      }

      return Spikes;

    })(Polygon);
  });

}).call(this);
