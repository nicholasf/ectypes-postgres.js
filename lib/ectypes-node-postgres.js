var pg = require('pg');
var lingo = require('lingo');
var util = require('util');

var PGStrategy = function(connString){
	this.connString = connString;
};

PGStrategy.prototype.representType = function representType(value){
	if (typeof value === 'string'){
		return "\'" + value + "\'";
	} else {
		return value;
	}
}

/*
 * This strategy *assumes* that modelName is the singular
 * to the name of the table which is the plural - e.g. 'user'
 * will map to a 'Users' table.
 * Note - the default language here used via Visionmedia's lingo
 * is English. 
 * 
 * Future support for other languages would see a locale argument
 * passed into strategy functions.
 */
PGStrategy.prototype.create = function(modelName, values, cb){ 
	var tableName = lingo.underscore(modelName);
	tableName = lingo.en.pluralize(tableName);
	tableName = tableName.toLowerCase();

	var sql = util.format("insert into %s ", tableName);
	var keys = [];
	var insertionValues = [];

	for (var key in values){
		keys.push(key);
		insertionValues.push(this.representType(values[key]));
	}

	sql += "(" + keys.join(",") + ") ";
	sql += "values (" + insertionValues.join(",") + ");"

	pg.connect(this.connString, function(err, client){
		if (err){ throw "Error establishing Configuration: ", err; }
		console.log("running this sql: ", sql);
		client.query(sql, function(err, result){
			cb(err, result);
		});
	})
};

PGStrategy.prototype.ignores = ['setup', 'ignores'];

module.exports = PGStrategy;