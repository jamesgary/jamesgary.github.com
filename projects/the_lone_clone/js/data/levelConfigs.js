(function() {

  define(function() {
    return {
      configFor: function(levelNum) {
        switch (levelNum) {
          case 7:
            return {
              tweak: function(world) {
                var m, _i, _len, _ref, _results;
                _ref = world.movers;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  m = _ref[_i];
                  m.minHeight = 2;
                  _results.push(m.maxHeight = 11);
                }
                return _results;
              }
            };
          case 11:
            return {
              numClones: 20
            };
          case 12:
            return {
              numClones: 3
            };
          case 13:
            return {
              numClones: 5
            };
          case 14:
            return {
              numClones: 30,
              tweak: function(world) {
                var m, _i, _len, _ref, _results;
                _ref = world.movers;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  m = _ref[_i];
                  m.minHeight = 2;
                  _results.push(m.maxHeight = 11);
                }
                return _results;
              }
            };
          case 15:
            return {
              numClones: 40
            };
          case 16:
            return {
              numClones: 3
            };
          case 17:
            return {
              numClones: 15
            };
          case 18:
            return {
              numClones: 1
            };
          case 19:
            return {
              tweak: function(world) {
                var g, _i, _len, _ref, _results;
                _ref = world.ghosts;
                _results = [];
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                  g = _ref[_i];
                  _results.push(g.gigafy());
                }
                return _results;
              }
            };
          case 20:
            return {
              numClones: -1
            };
          default:
            return {};
        }
      }
    };
  });

}).call(this);
