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
  var exception_label = "Exception here";
  try {
    throw new Error(exception_label);
  } 
  catch(error) {
    var doc = Amon.exception_data_to_json(error);
    var json = JSON.parse(doc);

    test.equal(json.message, "Exception here");
    test.equal(json.exception_class, "Error: " + exception_label);
    test.done();
  }
};
