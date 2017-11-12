(function() {

  define(['jquery', 'jplayer', 'lib/persistence'], function($, jPlayer_unused, Persistence) {
    var PLAYLIST;
    PLAYLIST = [
      {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_01_-_Dalia.mp3',
        title: 'Dalia'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_02_-_School_Boy.mp3',
        title: 'School Boy'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_03_-_Dice.mp3',
        title: 'Dice'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_04_-_Pitnastka.mp3',
        title: 'Pietnastka'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_05_-_Salto.mp3',
        title: 'Salto'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_06_-_Czterdzieci_cztery.mp3',
        title: 'Czterdziesci Cztery'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_07_-_Noakowski.mp3',
        title: 'Noakowski'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_08_-_Podchody.mp3',
        title: 'Podchody'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_09_-_Keymonica.mp3',
        title: 'Keymonica'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_10_-_Superator.mp3',
        title: 'Superator'
      }, {
        downloadUrl: 'https://s3.amazonaws.com/james_gary/Pietnastka_-_11_-_Tape_Eater.mp3',
        title: 'Tape Eater'
      }
    ];
    return {
      start: function() {
        var self;
        self = this;
        this.currentIndex = 0;
        $('.songTitle').text(this.currentTitle());
        this.init();
        this.$player.bind($.jPlayer.event.ended, function(e) {
          self.advanceTrack();
          return self.playSong();
        });
        this.$player.bind($.jPlayer.event.pause, function(e) {
          $('.songInfo').fadeOut(200);
          return Persistence.set('mute', true);
        });
        return this.$player.bind($.jPlayer.event.play, function(e) {
          $('.songInfo').fadeIn(200);
          return Persistence.set('mute', false);
        });
      },
      init: function() {
        var self;
        self = this;
        return this.$player = $(".musicPlayer").jPlayer({
          cssSelectorAncestor: '.audioManager',
          cssSelector: {
            play: ".playing",
            pause: ".paused"
          },
          loop: true,
          preload: true,
          supplied: "mp3",
          swfPath: "/assets/",
          ready: function() {
            $(this).jPlayer("setMedia", {
              mp3: self.currentDownloadUrl()
            });
            if (!Persistence.get('mute')) {
              $('.songInfo').show();
              self.playSong();
            }
            return $('.audioManager').slideDown(500);
          }
        });
      },
      playSong: function() {
        this.$player.jPlayer("setMedia", {
          mp3: this.currentDownloadUrl()
        }).jPlayer('play');
        return $('.songTitle').text(this.currentTitle());
      },
      currentTitle: function() {
        return this.currentSong().title;
      },
      currentDownloadUrl: function() {
        return this.currentSong().downloadUrl;
      },
      currentSong: function() {
        return PLAYLIST[this.currentIndex];
      },
      advanceTrack: function() {
        this.currentIndex++;
        if (this.currentIndex >= PLAYLIST.length) {
          return this.currentIndex = 0;
        }
      }
    };
  });

}).call(this);
