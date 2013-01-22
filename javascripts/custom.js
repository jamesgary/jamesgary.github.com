(function() {
  var adjectives, custom, nouns, subtitles;

  subtitles = ["Because herding cats ~~ was too easy", "Ceci n'est pas ~~ une tagline", "Made with ~~ 100% Internet", "Disappointing ~~ since 1986", "I like what you like", "It sounded good ~~ on paper", "Ha! Ha! ~~ Internet!", "For shizzles ~~ and giggles", "I'm probably ~~ wrong but...", "&gt; 9000", "Test Blog, ~~ Please ignore"];

  adjectives = ["crushing", "overwhelming", "harrowing", "only the finest", "clinical", "crippling", "horrible", "tasteful", "the", "friggin'"];

  nouns = ["depression", "shame", "guilt", "manic depression", "anxiety", "nervous ticks", "distrust of others", "alcoholism"];

  custom = {
    displayRandomTagline: function() {
      var subtitle;
      subtitle = this.randomElement(subtitles).replace(" ~~ ", "<span class='breakline'></span>");
      return $("header hgroup h2").html(subtitle);
    },
    displayRandomPower: function() {
      var power;
      power = ['and', this.randomElement(adjectives), this.randomElement(nouns)].join(' ');
      return $("footer .credit .random-power").html(power);
    },
    randomElement: function(array) {
      var random_index;
      random_index = Math.floor(Math.random() * array.length);
      return array[random_index];
    }
  };

  $.domReady(function() {
    custom.displayRandomTagline();
    return custom.displayRandomPower();
  });

}).call(this);
