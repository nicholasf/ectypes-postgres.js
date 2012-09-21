var PGStrategy = require('../lib/ectypes-node-postgres.js');

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
//        console.log("the database is recreated!", arguments);
        done();
      });
    })
  });

  it('creates an object', function(done){
    var cb = function(err, project){
      console.log(arguments, " <<<< 1");
      console.log(project);
      should.exist(project);
      done();
    }
    ctx.Project.create(cb);
  });
});