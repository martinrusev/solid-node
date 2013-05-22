## Install

You can install the node.js client with <span class='code'>npm install solid</span>
<br/>
<br/>
If you want to use the client from the command line, you can install it globally with
<span class="code">sudo npm install solid -g</span> and then link it to your project with
<span class='code'>npm link solid</span>

## Usage

You can capture exceptions from your node application, by adding these lines in your main file. For example, if you start
your project with <span class="code">node server.js</span>, add them to <span class="code">server.js</span>


	var solid = require('solid').Solid; 
	process.addListener('uncaughtException', function(err) {
		solid.handle(err);
	});

	
## Bugs

If you find a bug in the node client, you can use the the github issues page to report it: 
[https://github.com/martinrusev/solid-node/issue](https://github.com/martinrusev/solid-node/issue)

