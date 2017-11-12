(function() {

  define(['lib/physics/physics'], function(Physics) {
    var Circle;
    return Circle = (function() {

      function Circle(circleData) {
        var func;
        func = circleData.isStatic ? 'addStaticCircle' : 'addCircle';
        this.physicalCircle = Physics[func](circleData);
        this.physicalCircle.userdata = this;
      }

      Circle.prototype.x = function(newX) {
        if (newX) {
          return this.physicalCircle.SetPosition({
            x: newX,
            y: this.y()
          });
        } else {
          return this.physicalCircle.GetPosition().x;
        }
      };

      Circle.prototype.y = function(newY) {
        if (newY) {
          return this.physicalCircle.SetPosition({
            y: newY,
            x: this.x()
          });
        } else {
          return this.physicalCircle.GetPosition().y;
        }
      };

      Circle.prototype.a = function(newA) {
        if (newA) {
          return this.physicalCircle.SetAngle(newA);
        } else {
          return this.physicalCircle.GetAngle();
        }
      };

      Circle.prototype.r = function(newR) {
        if (newR) {
          return this.physicalCircle.GetFixtureList().GetShape().SetRadius(newR);
        } else {
          return this.physicalCircle.GetFixtureList().GetShape().GetRadius();
        }
      };

      Circle.prototype.freeze = function() {
        return Physics.freeze(this.physicalCircle);
      };

      Circle.prototype.update = function() {
        var velocity;
        if (this.melted) {
          velocity = this.physicalCircle.GetLinearVelocityFromWorldPoint({
            x: this.x(),
            y: this.y()
          });
          velocity.x *= .99;
          return this.physicalCircle.SetLinearVelocity(velocity);
        }
      };

      return Circle;

    })();
  });

}).call(this);
