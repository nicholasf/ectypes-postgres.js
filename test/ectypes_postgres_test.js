var PGStrategy = require('../lib/ectypes_postgres.js');

var ectypes = require('ectypes')
  , should = require('should')
  , faker2 = require('faker2')
  , ctx = ectypes.createContext()
  , pg = require('pg');

strategy = new PGStrategy(process.env['DBCONN']);

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

    pg.connect(process.env['DBCONN'], function(err, client){
      client.query(sql, function(err, result){
        done();
      });
    })
  });

  it('creates an object', function(done){
    var cb = function(err, project){
      should.exist(project);
      var rowCount = parseInt(project.rowCount);
      rowCount.should.equal(1);

      done();
    }
    ctx.Project.create(cb);
  });
});