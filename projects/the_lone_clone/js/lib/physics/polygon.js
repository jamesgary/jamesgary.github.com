(function() {

  define(['lib/physics/physics'], function(Physics) {
    var Polygon;
    return Polygon = (function() {

      function Polygon(polygonData) {
        this.physicalPolygon = Physics.addStaticPolygon(polygonData);
        this.physicalPolygon.userdata = this;
      }

      Polygon.prototype.transform = function(shift) {
        return this.physicalPolygon.SetLinearVelocity({
          x: shift.x || 0,
          y: shift.y || 0
        });
      };

      Polygon.prototype.vertices = function() {
        var pos, vert, _i, _len, _ref, _results;
        pos = this.physicalPolygon.GetTransform().position;
        _ref = this.physicalPolygon.GetFixtureList().GetShape().GetVertices();
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          vert = _ref[_i];
          _results.push({
            x: vert.x + pos.x,
            y: vert.y + pos.y
          });
        }
        return _results;
      };

      Polygon.prototype.x = function() {
        return this.vertices()[0].x;
      };

      Polygon.prototype.y = function() {
        return this.vertices()[0].y;
      };

      return Polygon;

    })();
  });

}).call(this);
