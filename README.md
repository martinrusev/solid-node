[![build status](https://secure.travis-ci.org/martinrusev/amon-node.png)](http://travis-ci.org/martinrusev/amon-node)
## Install

You can install the node.js client with <span class='code'>npm install amon</span>
<br/>
<br/>
If you want to use the client from the command line, you can install it globally with
<span class="code">sudo npm install amon -g</span> and then link it to your project with
<span class='code'>npm link amon</span>

## Usage


### Logging


	var amon = require('amon').Amon; 

	// By default the client will try to send the log data on http://127.0.0.1:2464
	// You can change that with:
	amon.host = 'http://127.0.0.1';
	amon.port = 2464;

	amon.log('node.js message')
	amon.log('node.js debug message', 'debug')

	# Arrays
	amon.log(['data', 'more data'], 'debug')

	# Tagged logging
	amon.log(message, ['debug', 'info'])



### Exception handling

You can capture exceptions from your node application, by adding these lines in your main file. For example, if you start
your project with <span class="code">node server.js</span>, add them to <span class="code">server.js</span>


	var amon = require('amon').Amon; 
	process.addListener('uncaughtException', function(err) {
		amon.handle(err);
	});

	
## Bugs

If you find a bug in the node client, you can use the the github issues page to report it: 
[https://github.com/martinrusev/amon-node/issue](https://github.com/martinrusev/amon-node/issue)

