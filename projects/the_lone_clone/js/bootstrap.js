(function() {

  requirejs.config({
    paths: {
      box2d: 'vendor/Box2dWeb-2.1.a.3',
      jplayer: 'vendor/jplayer/jquery.jplayer.min',
      jquery: 'vendor/jquery-1.8.2',
      text: 'vendor/text',
      shim: {
        'jplayer': {
          deps: ['jquery']
        }
      }
    }
  });

  require(['controller'], function(Controller) {
    return Controller.setup();
  });

}).call(this);
