(function() {

  define(['models/world', 'models/interactions'], function(World, Interactions) {
    return {
      startLevel: function(levelNumber) {
        this.paused = false;
        this.levelWinCallbacks = [];
        this.levelLoseCallbacks = [];
        World.startLevel(levelNumber);
        World.setListeners(Interactions.preCollision(this), Interactions.postCollision(this));
        return this.player = World.player;
      },
      update: function() {
        if (!this.paused) {
          return World.update();
        }
      },
      onLevelWin: function(f) {
        return this.levelWinCallbacks.push(f);
      },
      onLevelLose: function(f) {
        return this.levelLoseCallbacks.push(f);
      },
      winLevel: function() {
        var f, _i, _len, _ref, _results;
        _ref = this.levelWinCallbacks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          _results.push(f());
        }
        return _results;
      },
      loseLevel: function() {
        var f, _i, _len, _ref, _results;
        _ref = this.levelLoseCallbacks;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          f = _ref[_i];
          _results.push(f());
        }
        return _results;
      },
      drawables: function() {
        return World.drawables();
      },
      togglePause: function() {
        return this.paused = !this.paused;
      },
      cloningUp: function() {
        return World.player.cloningUp = true;
      },
      cloningLeft: function() {
        return World.player.cloningLeft = true;
      },
      cloningDown: function() {
        return World.player.cloningDown = true;
      },
      cloningRight: function() {
        return World.player.cloningRight = true;
      },
      stopCloningUp: function() {
        return World.player.cloningUp = false;
      },
      stopCloningLeft: function() {
        return World.player.cloningLeft = false;
      },
      stopCloningDown: function() {
        return World.player.cloningDown = false;
      },
      stopCloningRight: function() {
        return World.player.cloningRight = false;
      }
    };
  });

}).call(this);
