// Nodeunit required for running the test suite
// Install with npm install -g nodeunit
// Run with nodeunit this file
var assert = require('assert');
var Solid = require('../lib/solid').Solid;

exports.testSolidPort = function(test){
  test.equal(Solid.port, 6464);
  test.done();
};

exports.testSolidHost = function(test){
  test.equal(Solid.host, '127.0.0.1');
  test.done();
};

exports.testExceptionHandler = function(test){
  var exception_label = "Exception here";
  try {
    throw new Error(exception_label);
  } 
  catch(error) {
    var data = Solid.exception_data(error);

    test.equal(data.message, exception_label);
    test.equal(data.exception_class, "Error: " + exception_label);
    test.done();
  }
};

exports.testExceptionHandlerWithoutLabel = function(test){
  try {
    throw new Error;
  } 
  catch(error) {
    var data = Solid.exception_data(error);
    
    test.equal(data.message, "");
    test.equal(data.exception_class, "Error");
    test.done();
  }
};
