var PGStrategy = require('../lib/ectypes_postgres.js');

var ectypes = require('ectypes')
  , should = require('should')
  , faker2 = require('faker2')
  , env = require('./../config/env')
  , ctx = ectypes.createContext()
  , pg = require('pg');

strategy = new PGStrategy(env.connectionString);

ctx.load(strategy);

var projectBlueprint = {
  Project: {
    name: function(){ return faker2.Name.findName() }
  }
};

ctx.add(projectBlueprint);

describe("it inserts data!", function(done){

  beforeEach(function(done){
    var sql = "drop schema public cascade;\
    create schema public;\
    create table projects(name character varying(1024));";

    pg.connect(env.connectionString, function(err, client){
      client.query(sql, function(err, result){
        done();
      });
    })
  });

  it('creates an object', function(done){
    var cb = function(err, project){
      should.exist(project);
      var rowCount = parseInt(project.rowCount);
      console.log("And the winner is! ", rowCount);      
      rowCount.should.equal(1);

      done();
    }
    ctx.Project.create(cb);
  });
});