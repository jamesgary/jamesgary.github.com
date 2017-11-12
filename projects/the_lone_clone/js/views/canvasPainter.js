(function() {

  define(function() {
    var heightPad, lineHeight, scale, textSize, widthPad;
    scale = 30;
    widthPad = 20;
    heightPad = 5;
    textSize = 24;
    lineHeight = 30;
    return {
      init: function(canvas1, canvas2, canvas3, canvas4) {
        var image, orig, self, _i, _len, _ref, _results;
        self = this;
        this.time = 0;
        this.canvasWidth = canvas1.width;
        this.canvasHeight = canvas1.height;
        this.ctx1 = canvas1.getContext('2d');
        this.ctx2 = canvas2.getContext('2d');
        this.ctx3 = canvas3.getContext('2d');
        this.ctx4 = canvas4.getContext('2d');
        this.playerImg = new Image();
        this.playerImg.src = 'assets/images/player.png';
        this.cloneImg = new Image();
        this.cloneImg.src = 'assets/images/clone.png';
        this.spikedPlayerImg = new Image();
        this.spikedPlayerImg.src = 'assets/images/spiked_player.png';
        this.spikedCloneImg = new Image();
        this.spikedCloneImg.src = 'assets/images/spiked_clone.png';
        this.platformImg = new Image();
        this.platformImg.src = 'assets/images/platform2.png';
        this.ghostImage = new Image();
        this.ghostImage.src = 'assets/images/ghost.png';
        this.imagesToLoad = [this.playerImg, this.cloneImg, this.spikedPlayerImg, this.spikedCloneImg, this.platformImg, this.ghostImage];
        this.totalImagesLoaded = 0;
        _ref = this.imagesToLoad;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          image = _ref[_i];
          orig = image.onload;
          _results.push(image.onload = function() {
            self.totalImagesLoaded++;
            if (this.src.indexOf('assets/images/platform2.png') >= 0) {
              return self.platformPattern = self.ctx3.createPattern(this, 'repeat');
            }
          });
        }
        return _results;
      },
      represent: function(drawables) {
        var lava, vertex, _i, _j, _len, _len1, _ref, _ref1, _results;
        this.drawables = drawables;
        if (this.drawables) {
          this.ctx = this.ctx1;
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.paintSpikes(this.drawables.spikes);
          this.ctx = this.ctx3;
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.paintPlatforms(this.drawables.platforms);
          this.paintTexts(this.drawables.texts);
          _ref = this.drawables.lavas;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            lava = _ref[_i];
            lava.minX = lava.minY = 9000;
            lava.maxX = lava.maxY = 0;
            _ref1 = lava.vertices();
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              vertex = _ref1[_j];
              if (vertex.x > lava.maxX) {
                lava.maxX = vertex.x;
              }
              if (vertex.x < lava.minX) {
                lava.minX = vertex.x;
              }
              if (vertex.y > lava.maxY) {
                lava.maxY = vertex.y;
              }
              if (vertex.y < lava.minY) {
                lava.minY = vertex.y;
              }
            }
            lava.minX = this.scale(lava.minX);
            lava.minY = this.scale(lava.minY);
            lava.maxX = this.scale(lava.maxX);
            lava.maxY = this.scale(lava.maxY);
            lava.drawingWidth = lava.maxX - lava.minX;
            _results.push(lava.drawingHeight = lava.maxY - lava.minY);
          }
          return _results;
        }
      },
      paint: function() {
        if (this.drawables && this.staticsPainted) {
          this.time++;
          this.ctx = this.ctx2;
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          this.paintPlayer(this.drawables.player);
          this.paintClones(this.drawables.clones);
          if (this.drawables.movers) {
            this.paintMovers(this.drawables.movers);
          }
          this.paintGoal(this.drawables.goal);
          if (this.drawables.lavas) {
            this.paintLavas(this.drawables.lavas);
          }
          this.ctx = this.ctx4;
          this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
          if (this.drawables.ghosts) {
            return this.paintGhosts(this.drawables.ghosts);
          }
        } else {
          if (this.totalImagesLoaded === this.imagesToLoad.length) {
            this.staticsPainted = true;
          }
          return this.represent(this.drawables);
        }
      },
      paintPlatforms: function(platforms) {
        this.ctx.lineWidth = 0;
        this.ctx.strokeStyle = 'rgba(100, 100, 100, 0)';
        this.ctx.fillStyle = this.platformPattern || 'rgb(50,50,50)';
        return this.paintPolygons(platforms);
      },
      paintLavas: function(lavas) {
        var a, g, grd, i, lava, randHeight, randWidth, randX, randY, _i, _len, _results;
        if (false) {
          this.ctx.fillStyle = '#ff0000';
          return this.paintPolygons(lavas);
        } else {
          _results = [];
          for (_i = 0, _len = lavas.length; _i < _len; _i++) {
            lava = lavas[_i];
            grd = this.ctx.createLinearGradient(0, lava.minY, 0, lava.maxY);
            grd.addColorStop(0.0, 'rgba(255, 0, 0, 0.0)');
            grd.addColorStop(0.3, 'rgba(255, 0, 0, 1.0)');
            this.ctx.fillStyle = grd;
            this.ctx.fillRect(lava.minX, lava.minY, lava.drawingWidth, lava.drawingHeight);
            _results.push((function() {
              var _j, _results1;
              _results1 = [];
              for (i = _j = 1; _j <= 50; i = ++_j) {
                g = parseInt(255 * Math.random());
                a = Math.sqrt(Math.random());
                this.ctx.fillStyle = "rgba(255, " + g + ", 0, " + a + ")";
                randWidth = (100 + lava.drawingWidth * Math.random()) / 10;
                randHeight = lava.drawingHeight * Math.random();
                randX = lava.minX + (lava.drawingWidth * Math.random()) - (.5 * randWidth);
                randY = lava.minY + (lava.drawingHeight * Math.random()) - (.5 * randHeight);
                _results1.push(this.ctx.fillRect(randX, randY, randWidth, randHeight));
              }
              return _results1;
            }).call(this));
          }
          return _results;
        }
      },
      paintMovers: function(movers) {
        this.ctx.fillStyle = "rgb(200, 200, 200)";
        return this.paintPolygons(movers);
      },
      paintPolygons: function(polygons) {
        var firstVertex, polygon, vertex, _i, _j, _len, _len1, _ref, _results;
        _results = [];
        for (_i = 0, _len = polygons.length; _i < _len; _i++) {
          polygon = polygons[_i];
          firstVertex = polygon.vertices()[0];
          this.ctx.beginPath();
          this.ctx.moveTo(this.scale(firstVertex.x), this.scale(firstVertex.y));
          _ref = polygon.vertices();
          for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
            vertex = _ref[_j];
            this.ctx.lineTo(this.scale(vertex.x), this.scale(vertex.y));
          }
          this.ctx.closePath();
          this.ctx.stroke();
          _results.push(this.ctx.fill());
        }
        return _results;
      },
      paintSpikes: function(allSpikes) {
        var dx, dy, endX, endY, i, length, numSpikes, space, spikeLength, spikes, x, xSpace, y, ySpace, _i, _len, _results;
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'gray';
        this.ctx.fillStyle = 'white';
        spikeLength = 10;
        space = 20;
        _results = [];
        for (_i = 0, _len = allSpikes.length; _i < _len; _i++) {
          spikes = allSpikes[_i];
          x = this.scale(spikes.x1);
          y = this.scale(spikes.y1);
          endX = this.scale(spikes.x2);
          endY = this.scale(spikes.y2);
          dx = endX - x;
          dy = endY - y;
          length = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
          numSpikes = 1 + (length / space);
          xSpace = dx / numSpikes;
          ySpace = dy / numSpikes;
          _results.push((function() {
            var _j, _ref, _results1;
            _results1 = [];
            for (i = _j = 0, _ref = numSpikes - 1; 0 <= _ref ? _j < _ref : _j > _ref; i = 0 <= _ref ? ++_j : --_j) {
              x += xSpace;
              y += ySpace;
              if (x > endX) {
                x = endX;
              }
              if (y > endY) {
                y = endY;
              }
              this.ctx.beginPath();
              this.ctx.lineTo(x, y + spikeLength);
              this.ctx.lineTo(x + spikeLength, y);
              this.ctx.lineTo(x, y - spikeLength);
              this.ctx.lineTo(x - spikeLength, y);
              this.ctx.closePath();
              _results1.push(this.ctx.fill());
            }
            return _results1;
          }).call(this));
        }
        return _results;
      },
      paintClones: function(clones) {
        var clone, _i, _len, _results;
        _results = [];
        for (_i = 0, _len = clones.length; _i < _len; _i++) {
          clone = clones[_i];
          if (clone.dead) {
            _results.push(this.paintObject(clone, this.spikedCloneImg));
          } else {
            _results.push(this.paintObject(clone, this.cloneImg));
          }
        }
        return _results;
      },
      paintPlayer: function(player) {
        if (player.dead) {
          return this.paintObject(player, this.spikedPlayerImg);
        } else {
          return this.paintObject(player, this.playerImg);
        }
      },
      paintGoal: function(goal) {
        var glow, grd, r, x, y;
        this.ctx.beginPath();
        x = this.scale(goal.x());
        y = this.scale(goal.y());
        if (this.drawables.levelNumber === 20) {
          r = this.scale(0.5);
        } else {
          r = this.scale(0.1);
        }
        glow = (Math.abs(Math.sin(this.time / 15)) * 3) + 1;
        grd = this.ctx.createRadialGradient(x, y, r, x, y, r + (r * glow));
        grd.addColorStop(0.0, 'rgba(255, 255, 255, 1.0)');
        grd.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
        grd.addColorStop(0.4, 'rgba(255, 255, 255, 0.2)');
        grd.addColorStop(1.0, 'rgba(255, 255, 255, 0.0)');
        this.ctx.arc(x, y, r + (r * glow), 0, 2 * Math.PI, false);
        this.ctx.fillStyle = grd;
        return this.ctx.fill();
      },
      paintGhosts: function(ghosts) {
        var ghost, h, w, x, y, _i, _len;
        this.ctx.globalAlpha = 0.7;
        for (_i = 0, _len = ghosts.length; _i < _len; _i++) {
          ghost = ghosts[_i];
          w = this.scale(ghost.r() * 7) + (3 * Math.sin(this.time / 10));
          h = this.scale(ghost.r() * 7) + (3 * Math.cos(this.time / 10));
          x = this.scale(ghost.x()) - (.5 * w);
          y = this.scale(ghost.y()) - (.5 * h);
          this.ctx.drawImage(this.ghostImage, x, y, w, h);
        }
        return this.ctx.globalAlpha = 1.0;
      },
      paintTexts: function(texts) {
        var maxWidth, text, textLine, textLines, width, x, y, yShift, _i, _j, _len, _len1, _results;
        this.ctx.font = "" + textSize + "px sans-serif";
        _results = [];
        for (_i = 0, _len = texts.length; _i < _len; _i++) {
          text = texts[_i];
          x = this.scale(text.x);
          y = this.scale(text.y);
          textLines = text.text.split('\n');
          maxWidth = 0;
          for (_j = 0, _len1 = textLines.length; _j < _len1; _j++) {
            textLine = textLines[_j];
            width = this.ctx.measureText(textLine);
            if (width.width > maxWidth) {
              maxWidth = width.width;
            }
          }
          this.ctx.fillStyle = "rgba(0, 0, 0, .7)";
          this.ctx.fillRect(x - widthPad, y - lineHeight - heightPad, maxWidth + (widthPad * 2), (30 * (textLines.length - 1)) + (lineHeight * 1.5) + (heightPad * 2));
          yShift = 0;
          this.ctx.fillStyle = "rgba(255, 255, 255, 1.0)";
          _results.push((function() {
            var _k, _len2, _results1;
            _results1 = [];
            for (_k = 0, _len2 = textLines.length; _k < _len2; _k++) {
              textLine = textLines[_k];
              this.ctx.fillText(textLine, this.scale(text.x), this.scale(text.y) + yShift);
              _results1.push(yShift += lineHeight);
            }
            return _results1;
          }).call(this));
        }
        return _results;
      },
      paintObject: function(object, image) {
        var r;
        this.ctx.save();
        this.ctx.translate(this.scale(object.x()), this.scale(object.y()));
        this.ctx.rotate(object.a());
        r = this.scale(object.r());
        this.ctx.drawImage(image, -r, -r, 2 * r, 2 * r);
        return this.ctx.restore();
      },
      scale: function(num) {
        return num * scale;
      }
    };
  });

}).call(this);
