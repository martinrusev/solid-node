var solid = require('./lib/solid.js').Solid;
solid.port = 6464
solid.secret_key = 'p86f9cfgEuvl4HFGthR1TBAUE7Sfiz8NoDGTeNHh7Sw'

process.addListener('uncaughtException', err => {
	solid.handle(err);
});

try {
  throw new Error("Test Error");
} catch(error) {
  solid.handle(error);
}


throw new Error("Test Error 2");
