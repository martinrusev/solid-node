var amon = require('./lib/amon.js').Amon;

amon.port = 2464
amon.secret_key = "WxCWoYEHKs0LVVGSN1sUPhPdZXCkGjFM0YtqhIQPIZo"

var start = new Date().getTime();
for(var i = 0; i < 100; i++) {
    amon.log('node.js log message', ['test'])
}
var stop = new Date().getTime();
var executionTime = stop - start;

console.log('HTTP logging:'+executionTime+' miliseconds')



