(function() {
  var __slice = [].slice;

  define(["text!data/levelMaps/1.svg", "text!data/levelMaps/2.svg", "text!data/levelMaps/3.svg", "text!data/levelMaps/4.svg", "text!data/levelMaps/5.svg", "text!data/levelMaps/6.svg", "text!data/levelMaps/7.svg", "text!data/levelMaps/8.svg", "text!data/levelMaps/9.svg", "text!data/levelMaps/10.svg", "text!data/levelMaps/11.svg", "text!data/levelMaps/12.svg", "text!data/levelMaps/13.svg", "text!data/levelMaps/14.svg", "text!data/levelMaps/15.svg", "text!data/levelMaps/16.svg", "text!data/levelMaps/17.svg", "text!data/levelMaps/18.svg", "text!data/levelMaps/19.svg", "text!data/levelMaps/20.svg"], function() {
    var levels;
    levels = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return {
      load: function(levelNum) {
        var level, svgString;
        level = {
          rects: [],
          polygons: [],
          circles: []
        };
        svgString = levels[levelNum - 1];
        this.svg = (new DOMParser()).parseFromString(svgString, "text/xml");
        level.start = this.findStart();
        level.goal = this.findGoal();
        level.spikes = this.findSpikes();
        level.ghosts = this.findGhosts();
        level.movers = this.findMovers();
        level.platforms = this.findPlatforms().concat(this.findRectifiedPaths()).concat(this.findPolygons());
        level.lavas = this.findLavas();
        level.texts = this.findTexts();
        return level;
      },
      findStart: function() {
        var circle, _i, _len, _ref;
        _ref = this.svg.getElementsByTagName('circle');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          circle = _ref[_i];
          if (this.isGreen(circle.style.fill)) {
            return this.locateCircle(circle);
          }
        }
      },
      findGoal: function() {
        var circle, _i, _len, _ref;
        _ref = this.svg.getElementsByTagName('circle');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          circle = _ref[_i];
          if (this.isLightBlue(circle.style.fill)) {
            return this.locateCircle(circle);
          }
        }
      },
      findGhosts: function() {
        var circle, ghosts, _i, _len, _ref;
        ghosts = [];
        _ref = this.svg.getElementsByTagName('circle');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          circle = _ref[_i];
          if (this.isRed(circle.style.fill)) {
            ghosts.push(this.locateCircle(circle));
          }
        }
        return ghosts;
      },
      findPlatforms: function() {
        var polygons, rect, _i, _len, _ref;
        polygons = [];
        _ref = this.svg.getElementsByTagName('rect');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rect = _ref[_i];
          if (this.isPlatform(rect)) {
            polygons.push(this.verticesFromRect(rect));
          }
        }
        return polygons;
      },
      findMovers: function() {
        var polygons, rect, _i, _len, _ref;
        polygons = [];
        _ref = this.svg.getElementsByTagName('rect');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rect = _ref[_i];
          if (this.isMover(rect)) {
            polygons.push(this.verticesFromRect(rect));
          }
        }
        return polygons;
      },
      findLavas: function() {
        var polygons, rect, _i, _len, _ref;
        polygons = [];
        _ref = this.svg.getElementsByTagName('rect');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          rect = _ref[_i];
          if (this.isLava(rect)) {
            polygons.push(this.verticesFromRect(rect));
          }
        }
        return polygons;
      },
      findRectifiedPaths: function() {
        var c1, c2, coordinates, height, i, length, path, polygons, thickness, width, xS, yS, _i, _len, _ref;
        thickness = .1;
        polygons = [];
        _ref = this.svg.getElementsByTagName('path');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path = _ref[_i];
          if (this.isBlue(path.style.stroke)) {
            coordinates = this.getCoordinatesForPath(path);
            polygons = (function() {
              var _j, _ref1, _results;
              _results = [];
              for (i = _j = 0, _ref1 = coordinates.length - 1; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
                c1 = coordinates[i];
                c2 = coordinates[i + 1];
                width = c2.x - c1.x;
                height = c2.y - c1.y;
                length = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
                xS = thickness * height / length;
                yS = thickness * width / length;
                _results.push([
                  {
                    x: c1.x - xS,
                    y: c1.y + yS
                  }, {
                    x: c1.x + xS,
                    y: c1.y - yS
                  }, {
                    x: c2.x + xS,
                    y: c2.y - yS
                  }, {
                    x: c2.x - xS,
                    y: c2.y + yS
                  }
                ]);
              }
              return _results;
            })();
          }
        }
        return polygons;
      },
      findPolygons: function() {
        var path, polygons, _i, _len, _ref;
        polygons = [];
        _ref = this.svg.getElementsByTagName('path');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path = _ref[_i];
          if (this.isGreen(path.style.fill)) {
            polygons.push(this.getCoordinatesForPath(path));
          }
        }
        return polygons;
      },
      findSpikes: function() {
        var path, spikes, _i, _len, _ref;
        spikes = [];
        _ref = this.svg.getElementsByTagName('path');
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          path = _ref[_i];
          if (this.isPink(path.style.color) || this.isPink(path.style.stroke)) {
            spikes.push(this.getCoordinatesForPath(path));
          }
        }
        return spikes;
      },
      findTexts: function() {
        var span, spans, text, _i, _len, _ref, _results;
        _ref = this.svg.getElementsByTagName('text');
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          text = _ref[_i];
          spans = (function() {
            var _j, _len1, _ref1, _results1;
            _ref1 = text.getElementsByTagName('tspan');
            _results1 = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              span = _ref1[_j];
              _results1.push(span.textContent);
            }
            return _results1;
          })();
          _results.push({
            x: this.scale(text.x.baseVal.getItem(0).value),
            y: this.scale(text.y.baseVal.getItem(0).value),
            text: spans.join('\n')
          });
        }
        return _results;
      },
      locateCircle: function(circle) {
        var attr, regexForX, regexForY, x, y;
        attr = circle.getAttribute('transform');
        regexForX = new RegExp("\\((.*),");
        regexForY = new RegExp(",(.*)\\)");
        x = regexForX.exec(attr)[1];
        y = regexForY.exec(attr)[1];
        return {
          x: this.scale(circle.cx.baseVal.value + x),
          y: this.scale(circle.cy.baseVal.value + y)
        };
      },
      verticesFromRect: function(rect) {
        var h, vertices, w, x, y;
        x = this.scale(rect.x.baseVal.value);
        y = this.scale(rect.y.baseVal.value);
        w = this.scale(rect.width.baseVal.value);
        h = this.scale(rect.height.baseVal.value);
        vertices = [];
        vertices[0] = {
          x: x,
          y: y
        };
        vertices[1] = {
          x: x + w,
          y: y
        };
        vertices[2] = {
          x: x + w,
          y: y + h
        };
        vertices[3] = {
          x: x,
          y: y + h
        };
        return vertices;
      },
      isPlatform: function(rect) {
        return !this.isLava(rect) && !this.isMover(rect);
      },
      isMover: function(rect) {
        return !this.isLava(rect) && rect.id.indexOf('mover') === 0;
      },
      isLava: function(rect) {
        return this.isRed(rect.style.fill);
      },
      getCoordinatesForPath: function(path) {
        var coordinates, currentPos, d, i, num, numbers, _i, _j, _ref, _ref1, _results;
        d = path.getAttribute('d');
        if (d.indexOf('M') === 0) {
          numbers = d.match(/(-?\d+\.?\d*)/g);
          _results = [];
          for (i = _i = 0, _ref = numbers.length; _i < _ref; i = _i += 2) {
            _results.push({
              x: this.scale(parseFloat(numbers[i])),
              y: this.scale(parseFloat(numbers[i + 1]))
            });
          }
          return _results;
        } else {
          numbers = (function() {
            var _j, _len, _ref1, _results1;
            _ref1 = d.match(/(-?\d+\.?\d*)/g);
            _results1 = [];
            for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
              num = _ref1[_j];
              _results1.push(this.scale(parseFloat(num)));
            }
            return _results1;
          }).call(this);
          currentPos = {
            x: numbers[0],
            y: numbers[1]
          };
          coordinates = [currentPos];
          for (i = _j = 2, _ref1 = numbers.length; _j < _ref1; i = _j += 2) {
            currentPos = {
              x: currentPos.x + numbers[i],
              y: currentPos.y + numbers[i + 1]
            };
            coordinates.push(currentPos);
          }
          return coordinates;
        }
      },
      scale: function(val) {
        return val / 30.0;
      },
      isGreen: function(color) {
        return color === 'rgb(0, 255, 0)' || color === '#00ff00';
      },
      isLightBlue: function(color) {
        return color === 'rgb(0, 255, 255)' || color === '#00ffff';
      },
      isRed: function(color) {
        return color === 'rgb(255, 0, 0)' || color === '#ff0000';
      },
      isBlue: function(color) {
        return color === 'rgb(0, 0, 255)' || color === '#0000ff';
      },
      isPink: function(color) {
        return color === 'rgb(255, 0, 255)' || color === '#ff00ff';
      }
    };
  });

}).call(this);
