## Install

You can install the node.js client with `npm install solid`


If you want to use the client from the command line, you can install it globally with
`sudo npm install solid-node -g`and then link it to your project with
`npm link solid-node`

## Usage

You can capture exceptions from your node application, by adding these lines in your main file. For example, if you start
your project with `node server.js`, add them to `server.js`


	var solid = require('solid').Solid; 
	process.addListener('uncaughtException', function(err) {
		solid.handle(err);
	});

	
## Bugs

If you find a bug in the node client, you can use the the github issues page to report it: 
[https://github.com/martinrusev/solid-node/issue](https://github.com/martinrusev/solid-node/issue)

