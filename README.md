# ectypes-postgres

An ectypes strategy for node-postgres

## Installing

`npm install ectypes-postgres`

## Running tests

Steps.

1) ectypes-postgres uses ectypes as a peer dependency, so if you want to run tests locally you will have to manually 
`npm install ectypes`.

2) Identify the connection string. 

The postgres strategy connects via a connectionString that is passed into a constructor function.

For example, in the tests:

```
strategy = new PGStrategy(process.env['DBCONN']);

```

If you want the tests to run you will need to work out this value (see step 3). Similarly, if you want to develop 
against this lib you will need to come up with a way to identify this value.

3) Run mocha

`NODE_ENV=test DBCONN=postgres://nicholasf:@localhost/keno_api_link_test mocha`

See the tests, https://github.com/brianc/node-postgres and https://github.com/nicholasf/ectypes.js 

## License
Copyright (c) 2012 Nicholas Faiz  
Licensed under the MIT license.
