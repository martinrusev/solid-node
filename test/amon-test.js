// Nodeunit required for running the test suite
// Install with npm install -g nodeunit
// Run with nodeunit this file
var assert = require('assert');
var Amon = require('../lib/amon').Amon;


exports.testAmonPort = function(test){
    test.equal(Amon.port, 2464);
    test.done();
};

exports.testAmonHost = function(test){
    test.equal(Amon.host, '127.0.0.1');
    test.done();
};

exports.testExceptionHandler = function(test){
  try {
    throw new Error("Exception here");
  } catch(error) {
    var doc = Amon.exception_data_to_json(error);
    var json = JSON.parse(doc);
	console.log(json);

    test.equal(json.message, "Exception here");
    test.equal(json.exception_class, "node");
    test.done();
  }
};
