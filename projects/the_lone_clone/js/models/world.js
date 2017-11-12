(function() {

  define(['lib/physics/physics', 'models/player', 'models/goal', 'models/spikes', 'models/ghost', 'models/mover', 'models/platform', 'models/lava', 'lib/levelUtil', 'data/levelConfigs'], function(Physics, Player, Goal, Spikes, Ghost, Mover, Platform, Lava, LevelUtil, LevelConfigs) {
    return {
      startLevel: function(levelNumber) {
        var levelConfig;
        this.levelNumber = levelNumber;
        Physics.createWorld();
        this.levelWinCallbacks = [];
        this.loadLevel();
        levelConfig = LevelConfigs.configFor(this.levelNumber);
        if (levelConfig.tweak) {
          levelConfig.tweak(this);
        }
        if (levelConfig.numClones) {
          this.player.clonesLeft = levelConfig.numClones;
        }
        return this.player.displayClonesLeftInit();
      },
      update: function() {
        var clone, ghost, mover, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2, _results;
        if (this.levelNumber) {
          Physics.update();
          this.player.update();
          _ref = this.player.clones;
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            clone = _ref[_i];
            clone.update();
          }
          _ref1 = this.ghosts;
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            ghost = _ref1[_j];
            ghost.update();
          }
          _ref2 = this.movers;
          _results = [];
          for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
            mover = _ref2[_k];
            _results.push(mover.update());
          }
          return _results;
        }
      },
      drawables: function() {
        return {
          platforms: this.platforms,
          movers: this.movers,
          spikes: this.spikes,
          clones: this.player.clones,
          player: this.player,
          goal: this.goal,
          ghosts: this.ghosts,
          lavas: this.lavas,
          texts: this.texts,
          levelNumber: this.levelNumber
        };
      },
      setListeners: function(preCollision, postCollision) {
        return Physics.setListeners(preCollision, postCollision);
      },
      loadLevel: function() {
        var ghost, lava, levelData, mover, platform, spikeLine;
        levelData = LevelUtil.load(this.levelNumber);
        this.player = new Player({
          x: levelData.start.x,
          y: levelData.start.y
        });
        this.goal = new Goal({
          x: levelData.goal.x,
          y: levelData.goal.y
        });
        this.platforms = (function() {
          var _i, _len, _ref, _results;
          _ref = levelData.platforms;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            platform = _ref[_i];
            _results.push(new Platform(platform));
          }
          return _results;
        })();
        this.spikes = (function() {
          var _i, _len, _ref, _results;
          _ref = levelData.spikes;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            spikeLine = _ref[_i];
            _results.push(new Spikes(spikeLine));
          }
          return _results;
        })();
        this.ghosts = (function() {
          var _i, _len, _ref, _results;
          _ref = levelData.ghosts;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            ghost = _ref[_i];
            _results.push(new Ghost({
              x: ghost.x,
              y: ghost.y
            }, this.player));
          }
          return _results;
        }).call(this);
        this.movers = (function() {
          var _i, _len, _ref, _results;
          _ref = levelData.movers;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            mover = _ref[_i];
            _results.push(new Mover(mover));
          }
          return _results;
        })();
        this.lavas = (function() {
          var _i, _len, _ref, _results;
          _ref = levelData.lavas;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            lava = _ref[_i];
            _results.push(new Lava(lava));
          }
          return _results;
        })();
        return this.texts = levelData.texts;
      }
    };
  });

}).call(this);
