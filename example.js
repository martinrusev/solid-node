var amon = require('./lib/amon.js').Amon;
amon.protocol = 'zeromq'
amon.port = 5464
//amon.app_key = 'p86f9cfgEuvl4HFGthR1TBAUE7Sfiz8NoDGTeNHh7Sw'

amon.log('node.js log message', 'zeromq')

process.addListener('uncaughtException', function(err) {
	amon.handle(err);
});

try {
  throw new Error("Test Error");
} catch(error) {
  amon.handle(error);
}


throw new Error("Test Error 2");
