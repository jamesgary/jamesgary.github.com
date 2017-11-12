(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['lib/physics/circle', 'models/clone', 'jquery'], function(Circle, Clone, $) {
    var COOLDOWN_REQUIRED, PLAYER_RAD, Player;
    PLAYER_RAD = .5;
    COOLDOWN_REQUIRED = 10;
    return Player = (function(_super) {

      __extends(Player, _super);

      function Player(circleData) {
        circleData.r = PLAYER_RAD;
        Player.__super__.constructor.call(this, circleData);
        this.stamina = 0;
        this.clones = [];
        this.clonesLeft = void 0;
      }

      Player.prototype.spike = function() {
        this.spiked = this.dead = true;
        return this.freeze();
      };

      Player.prototype.spook = function() {
        return this.spooked = this.dead = true;
      };

      Player.prototype.melt = function() {
        return this.melted = this.dead = true;
      };

      Player.prototype.update = function() {
        Player.__super__.update.call(this);
        if (!this.dead) {
          this.stamina++;
          if ((this.stamina >= COOLDOWN_REQUIRED && (!(this.clonesLeft != null) || this.clonesLeft > 0)) && (this.cloningRight || this.cloningLeft || this.cloningDown || this.cloningUp)) {
            return this.makeClone();
          }
        }
      };

      Player.prototype.displayClonesLeftInit = function() {
        if (this.clonesLeft != null) {
          $('.clonesLeftContainer').show();
          return this.displayClonesLeft();
        } else {
          return $('.clonesLeftContainer').hide();
        }
      };

      Player.prototype.displayClonesLeft = function() {
        return $('.clonesLeft').text(this.clonesLeft);
      };

      Player.prototype.makeClone = function() {
        var x, y;
        if (this.clonesLeft != null) {
          this.clonesLeft--;
        }
        this.stamina = 0;
        x = this.x();
        y = this.y();
        if (this.cloningRight) {
          x += PLAYER_RAD;
        }
        if (this.cloningLeft) {
          x -= PLAYER_RAD;
        }
        if (this.cloningDown) {
          y += PLAYER_RAD;
        }
        if (this.cloningUp) {
          y -= PLAYER_RAD;
        }
        this.clones.push(new Clone({
          x: x,
          y: y
        }, this));
        return this.displayClonesLeft();
      };

      return Player;

    })(Circle);
  });

}).call(this);
