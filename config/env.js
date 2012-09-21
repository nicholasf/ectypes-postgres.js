var fs = require('fs')
	, nconf = require('nconf');

//all code in defaults can be overridden by supplying a --config file parameter 
// (e.g. --config 'path/to/config.json')
//to starting up the server
nconf.argv().env().file({file: 'config/defaults.json'});

var overridingConfig = nconf.get('defaults');

if (overridingConfig) { 
	nconf.file(overridingConfig);
	console.log('Found a config file to override anything in config/default.json');
}

var env = process.env.NODE_ENV  || 'development';

envConf = nconf.get(env);
var db = envConf.database;

if (!db) { throw Error('The database config is undefined in environment ' + env + '. Check your config.'); }

connectionString = 'postgres://' + db.user + ':' + db.password + '@' + db.host + '/' + db.name;

exports.connectionString = connectionString;

//expose the defaults.json (or other config) top level properties directly on exports
for (var prop in envConf){
//	console.log('exporting .. ', prop, ' as ', envConf[prop]);
	exports[prop] = envConf[prop];
}

exports.env = env;