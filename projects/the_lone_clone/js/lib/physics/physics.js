(function() {

  define(['box2d'], function(Box2D) {
    var b2Body, b2BodyDef, b2CircleShape, b2DebugDraw, b2EdgeShape, b2Fixture, b2FixtureDef, b2PolygonShape, b2Vec2, b2World, debugDrawing;
    debugDrawing = true;
    b2Vec2 = Box2D.Common.Math.b2Vec2;
    b2BodyDef = Box2D.Dynamics.b2BodyDef;
    b2Body = Box2D.Dynamics.b2Body;
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    b2Fixture = Box2D.Dynamics.b2Fixture;
    b2World = Box2D.Dynamics.b2World;
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    return {
      createWorld: function() {
        var gravity;
        gravity = new b2Vec2(0, 10);
        this.world = new b2World(gravity, true);
        if (debugDrawing) {
          this.setupDebugDraw(document.getElementById('canvas'));
        }
        this.fixDef = new b2FixtureDef;
        this.fixDef.density = 1.0;
        this.fixDef.friction = 0.5;
        this.fixDef.restitution = 0.2;
        return this.bodyDef = new b2BodyDef;
      },
      addStaticPolygon: function(vertices) {
        var b, vec, vecs, vertice;
        this.bodyDef.type = b2Body.b2_kinematicBody;
        this.fixDef.shape = new b2PolygonShape;
        vecs = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = vertices.length; _i < _len; _i++) {
            vertice = vertices[_i];
            vec = new b2Vec2;
            vec.Set(vertice.x, vertice.y);
            _results.push(vec);
          }
          return _results;
        })();
        this.fixDef.shape.SetAsArray(vecs, vecs.length);
        this.bodyDef.position.x = 0;
        this.bodyDef.position.y = 0;
        b = this.world.CreateBody(this.bodyDef);
        b.CreateFixture(this.fixDef);
        return b;
      },
      addCircle: function(circle) {
        return this.createCircle(circle, b2Body.b2_dynamicBody);
      },
      addStaticCircle: function(circle) {
        return this.createCircle(circle, b2Body.b2_staticBody);
      },
      setListeners: function(preCollision, postCollision) {
        var listener;
        listener = new Box2D.Dynamics.b2ContactListener;
        listener.PreSolve = function(contact) {
          var a, b;
          a = contact.GetFixtureA().GetBody().userdata;
          b = contact.GetFixtureB().GetBody().userdata;
          if (!preCollision(a, b)) {
            return contact.SetEnabled(false);
          }
        };
        listener.PostSolve = function(contact) {
          var a, b;
          a = contact.GetFixtureA().GetBody().userdata;
          b = contact.GetFixtureB().GetBody().userdata;
          return postCollision(a, b);
        };
        return this.world.SetContactListener(listener);
      },
      freeze: function(body) {
        return body.SetType(b2Body.b2_staticBody);
      },
      update: function() {
        this.world.Step(1 / 60, 10, 10);
        if (debugDrawing) {
          return this.world.DrawDebugData();
        }
      },
      createCircle: function(circle, bodyDefType) {
        var body;
        this.bodyDef.type = bodyDefType;
        this.fixDef.shape = new b2CircleShape(circle.r);
        this.bodyDef.position.x = circle.x;
        this.bodyDef.position.y = circle.y;
        body = this.world.CreateBody(this.bodyDef);
        body.CreateFixture(this.fixDef);
        return body;
      },
      setupDebugDraw: function(canvas) {
        var debugDraw;
        if (canvas) {
          debugDraw = new b2DebugDraw();
          debugDraw.SetSprite(canvas.getContext("2d"));
          debugDraw.SetDrawScale(30.0);
          debugDraw.SetFillAlpha(0.3);
          debugDraw.SetLineThickness(1.0);
          debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
          return this.world.SetDebugDraw(debugDraw);
        }
      }
    };
  });

}).call(this);
