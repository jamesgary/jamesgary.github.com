(function() {

  define(['jquery', 'models/playground', 'views/canvasPainter', 'lib/gameLoop', 'views/trippyBackground', 'lib/persistence', 'lib/sound'], function($, Playground, CanvasPainter, GameLoop, TrippyBackground, Persistence, Sound) {
    var continueKeyCodes, currentLevel, downKeyCodes, escapedKeyCodes, leftKeyCodes, lost, pauseKeyCodes, playing, restartKeyCodes, rightKeyCodes, setUpGame, setUpInput, showDiv, showLevelSelect, startGame, startLevel, togglePause, upKeyCodes, won;
    playing = won = lost = false;
    currentLevel = 1;
    upKeyCodes = [87, 38];
    leftKeyCodes = [65, 37];
    downKeyCodes = [83, 40];
    rightKeyCodes = [68, 39];
    restartKeyCodes = [82];
    pauseKeyCodes = [80, 27];
    continueKeyCodes = [32, 82];
    escapedKeyCodes = [32, 37, 38, 39, 40];
    setUpGame = function() {
      currentLevel = parseInt(location.href.split('level=')[1]) || 1;
      return CanvasPainter.init(document.getElementById("canvas1"), document.getElementById("canvas2"), document.getElementById("canvas3"), document.getElementById("canvas4"));
    };
    startLevel = function() {
      Playground.startLevel(currentLevel);
      CanvasPainter.represent(Playground.drawables());
      if (Playground.player.clonesLeft != null) {
        $('.clonesLeftContainer').show();
      }
      playing = true;
      won = lost = false;
      $('.popup').fadeOut(200);
      Playground.onLevelWin(function() {
        var newLevelsCompleted;
        if (!(won || lost)) {
          newLevelsCompleted = (Persistence.get('levelsCompleted') || []).concat(currentLevel);
          Persistence.set('levelsCompleted', newLevelsCompleted);
          playing = false;
          won = true;
          if (currentLevel === 20) {
            return $(".game-complete").show();
          } else {
            return $(".level-complete").show();
          }
        }
      });
      return Playground.onLevelLose(function() {
        if (!(won || lost)) {
          $(".level-fail").fadeIn(1000);
          playing = false;
          return lost = true;
        }
      });
    };
    setUpInput = function() {
      $('body').keyup(function(e) {
        var key;
        key = e.keyCode;
        try {
          if (upKeyCodes.indexOf(key) !== -1) {
            Playground.stopCloningUp();
          }
          if (leftKeyCodes.indexOf(key) !== -1) {
            Playground.stopCloningLeft();
          }
          if (downKeyCodes.indexOf(key) !== -1) {
            Playground.stopCloningDown();
          }
          if (rightKeyCodes.indexOf(key) !== -1) {
            return Playground.stopCloningRight();
          }
        } catch (error) {
          return console.log("Possible error: " + error);
        }
      });
      $('body').keydown(function(e) {
        var key;
        key = e.keyCode;
        if (playing) {
          if (upKeyCodes.indexOf(key) !== -1) {
            Playground.cloningUp();
          }
          if (leftKeyCodes.indexOf(key) !== -1) {
            Playground.cloningLeft();
          }
          if (downKeyCodes.indexOf(key) !== -1) {
            Playground.cloningDown();
          }
          if (rightKeyCodes.indexOf(key) !== -1) {
            Playground.cloningRight();
          }
          if (restartKeyCodes.indexOf(key) !== -1) {
            startLevel();
          }
          if (pauseKeyCodes.indexOf(key) !== -1) {
            togglePause();
          }
        } else {
          if (won && continueKeyCodes.indexOf(key) !== -1) {
            currentLevel += 1;
            startLevel();
            $(".level-complete").fadeOut(200);
            playing = true;
          } else if (lost) {
            if (continueKeyCodes.indexOf(key) !== -1) {
              startLevel();
              $(".level-fail").fadeOut(200);
              playing = true;
            }
          }
        }
        if (escapedKeyCodes.indexOf(key) !== -1) {
          e.preventDefault();
        }
        return true;
      });
      $('a.start').click(function() {
        return showLevelSelect();
      });
      $('.level').click(function() {
        currentLevel = $(this).data().level;
        startLevel();
        return showDiv('playground');
      });
      $('a.credits').click(function() {
        return showDiv('credits');
      });
      $('a.resume').click(function() {
        return togglePause();
      });
      $('a.restart').click(function() {
        return startLevel();
      });
      return $('a.level-select').click(function() {
        return showLevelSelect();
      });
    };
    startGame = function() {
      return GameLoop.loop(function() {
        Playground.update();
        return CanvasPainter.paint();
      });
    };
    showDiv = function(div) {
      $("." + div).fadeIn(200);
      return $(".gameContainer > div:not(." + div + "):not(.audioManager)").fadeOut(200);
    };
    showLevelSelect = function() {
      var $levelDiv, completedLevels, levelDiv, levelNum, _i, _j, _len, _len1, _ref, _ref1;
      completedLevels = Persistence.get('levelsCompleted') || [];
      _ref = $('.level');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        levelDiv = _ref[_i];
        $levelDiv = $(levelDiv);
        $levelDiv.removeClass('available');
      }
      _ref1 = $('.level');
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        levelDiv = _ref1[_j];
        $levelDiv = $(levelDiv);
        levelNum = $levelDiv.data('level');
        if (completedLevels.indexOf(levelNum) !== -1) {
          $levelDiv.addClass('done');
          $levelDiv.addClass('available');
          $(".level[data-level=" + (levelNum + 1) + "]").addClass('available');
        }
      }
      $(".level[data-level=1]").addClass('available');
      return showDiv('level-select');
    };
    togglePause = function() {
      Playground.togglePause();
      if (Playground.paused) {
        return $('.popup.paused').fadeIn(200);
      } else {
        return $('.popup.paused').fadeOut(200);
      }
    };
    return {
      setup: function() {
        return $('document').ready(function() {
          TrippyBackground.setup(document.getElementById('trippyBackground'));
          Sound.start();
          setUpGame();
          setUpInput();
          return startGame();
        });
      }
    };
  });

}).call(this);
