(function() {

  define(['lib/webgl'], function(webgl) {
    return {
      setup: function(canvas) {
        var stationaryColor;
        try {
          webgl.initGl(canvas);
          webgl.addVertexShaders(["attribute vec3 position;\n\nvoid main() {\n    gl_Position = vec4(position, 1.0);\n}"]);
          stationaryColor = Math.floor(Math.random() * 3);
          webgl.addFragmentShaders(["#ifdef GL_ES\n  precision mediump float;\n#endif\n  uniform float time;  uniform vec2 resolution;  void main( void ) {    vec2 position = gl_FragCoord.xy / resolution.xy;    float t = time + 500.0;    float color = 0.0;    color += sin( position.x * cos( t / " + (this.rand(20) + 10) + " ) * " + (this.rand(100) + 5) + " ) + cos( position.y * cos( t / " + (this.rand(40) + 5) + " ) * " + (this.rand(100) + 5) + " );    color += sin( position.y * sin( t / " + (this.rand(20) + 10) + " ) * " + (this.rand(100) + 5) + " ) + cos( position.x * sin( t / " + (this.rand(40) + 5) + " ) * " + (this.rand(100) + 5) + " );    color += sin( position.x * sin( t / " + (this.rand(20) + 10) + " ) * " + (this.rand(100) + 5) + " ) + sin( position.y * sin( t / " + (this.rand(40) + 5) + " ) * " + (this.rand(100) + 5) + " );    color *= sin( t / " + (this.rand(10) + 10) + " ) * 0.9;    float r = abs(sin(color + t / " + (this.rand(5) + 1) + " ) * " + (this.rand(.5) + 1) + ");    float g = abs(sin(color + t / " + (this.rand(5) + 1) + " ) * " + (this.rand(.5) + 1) + ");    float b = abs(sin(color + t / " + (this.rand(5) + 1) + " ) * " + (this.rand(.5) + 1) + ");    if (" + (stationaryColor === 0) + ") { r = color; }    if (" + (stationaryColor === 1) + ") { g = color; }    if (" + (stationaryColor === 2) + ") { b = color; }    gl_FragColor = vec4( vec3( r, g, b ), 1.0 );  }      "]);
          this.setDimensions(600, 400);
          return this.start();
        } catch (error) {
          return console.log("WebGL error: " + error);
        }
      },
      start: function() {
        return webgl.animate();
      },
      pause: function() {
        return webgl.pause();
      },
      setDimensions: function(width, height) {
        return webgl.setDimensions(width, height);
      },
      setMouse: function(x, y) {
        return webgl.setMouse(x, y);
      },
      reset: function() {
        return webgl.reset();
      },
      rand: function(num) {
        num = Math.pow(Math.random() * num, .9);
        return ("" + num).substring(0, 5);
      },
      numBetween: function(min, max) {
        return min + (Math.random() * (max - min));
      }
    };
  });

}).call(this);
