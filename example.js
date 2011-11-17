var amon = require('amon').Amon;

amon.log('node.js unset message')
amon.log('node.js debug message', 'debug')
amon.log('node.js warning message', 'warning')
amon.log('node.js info message', 'info')

process.addListener('uncaughtException', function(err) {
	amon.handle(err);
});

//try {
  //throw new Error("Test Error 1");
//} catch(error) {
  //console.log("Error occurred ", error.message);
  //Amon.handle(error);
//}


throw new Error("Test Error 2");
