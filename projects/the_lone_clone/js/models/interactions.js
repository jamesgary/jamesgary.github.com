(function() {

  define(function() {
    var listener, self;
    listener = {};
    self = {};
    return {
      preCollision: function() {
        self = this;
        return function(a, b) {
          self.playerTouchesGoal(a, b);
          self.lavaMeltsPlayer(a, b);
          self.lavaMeltsClone(a, b);
          self.ghostsSpookPlayer(a, b);
          return self.isSolid(a, b);
        };
      },
      postCollision: function(l) {
        self = this;
        listener = l;
        return function(a, b) {
          self.playerTouchesSpikes(a, b);
          return self.cloneTouchesSpikes(a, b);
        };
      },
      playerTouchesGoal: function(a, b) {
        var goal, player, _ref;
        _ref = self.checkContact(a, b, 'Goal', 'Player'), player = _ref[0], goal = _ref[1];
        if (player && goal) {
          return listener.winLevel();
        }
      },
      playerTouchesSpikes: function(a, b) {
        var player, spikes, _ref;
        _ref = self.checkContact(a, b, 'Player', 'Spikes'), player = _ref[0], spikes = _ref[1];
        if (player && spikes) {
          player.spike();
          return listener.loseLevel();
        }
      },
      cloneTouchesSpikes: function(a, b) {
        var clone, spikes, _ref;
        _ref = self.checkContact(a, b, 'Clone', 'Spikes'), clone = _ref[0], spikes = _ref[1];
        if (clone && spikes) {
          return clone.spike();
        }
      },
      ghostsSpookPlayer: function(a, b) {
        var ghost, player, _ref;
        _ref = self.checkContact(a, b, 'Ghost', 'Player'), ghost = _ref[0], player = _ref[1];
        if (ghost && player) {
          player.spook();
          return listener.loseLevel();
        }
      },
      lavaMeltsPlayer: function(a, b) {
        var lava, player, _ref;
        _ref = self.checkContact(a, b, 'Lava', 'Player'), lava = _ref[0], player = _ref[1];
        if (lava && player) {
          player.melt();
          return listener.loseLevel();
        }
      },
      lavaMeltsClone: function(a, b) {
        var clone, lava, _ref;
        _ref = self.checkContact(a, b, 'Lava', 'Clone'), lava = _ref[0], clone = _ref[1];
        if (lava && clone) {
          return clone.melt();
        }
      },
      isSolid: function(a, b) {
        return !(self.isGoal(a, b) || self.isGhost(a, b) || self.isLava(a, b) || self.isMelted(a, b));
      },
      isGhost: function(a, b) {
        return (a && a.constructor.name === 'Ghost') || (b && b.constructor.name === 'Ghost');
      },
      isLava: function(a, b) {
        return (a && a.constructor.name === 'Lava') || (b && b.constructor.name === 'Lava');
      },
      isGoal: function(a, b) {
        return (a && a.constructor.name === 'Goal') || (b && b.constructor.name === 'Goal');
      },
      isMelted: function(a, b) {
        return (a && a.melted) || (b && b.melted);
      },
      checkContact: function(a, b, nameA, nameB) {
        var classA, classB;
        if (a && b) {
          classA = a.constructor.name;
          classB = b.constructor.name;
          if (classA === nameA && classB === nameB) {
            return [a, b];
          } else if (classA === nameB && classB === nameA) {
            return [b, a];
          }
        }
        return [null, null];
      }
    };
  });

}).call(this);
