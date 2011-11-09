var Amon = require('./lib/amon').Amon;

Amon.log('node.js unset message')
Amon.log('node.js debug message', 'debug')
Amon.log('node.js warning message', 'warning')
Amon.log('node.js info message', 'info')

process.addListener('uncaughtException', function(err) {
	Amon.handle(err);
});

//try {
  //throw new Error("Test Error 1");
//} catch(error) {
  //console.log("Error occurred ", error.message);
  //Amon.handle(error);
//}


throw new Error("Test Error 2");
