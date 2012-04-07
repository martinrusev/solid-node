var amon = require('./lib/amon.js').Amon;

amon.port = 2465

var start = new Date().getTime();
for(var i = 0; i < 10000; i++) {
    amon.log('node.js log message')
}
var stop = new Date().getTime();
var executionTime = stop - start;

console.log('HTTP logging:'+executionTime+' miliseconds')


amon.protocol = 'zeromq'
amon.port = 5464
amon.host = '127.0.0.1'

var start = new Date().getTime();
for(var i = 0; i < 10000; i++) {
    amon.log('node.js log message')
}
var stop = new Date().getTime();
var executionTime = stop - start;

console.log('ZeroMQ logging:'+executionTime+' miliseconds')


