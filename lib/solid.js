var http = require('http');

var Solid = {
		VERSION: '1.0',
		host: "127.0.0.1", 
		port: 6464,
		secret_key: false,
		protocol: 'http',

	handle: function(error) {
		var error_data = JSON.stringify(Solid.exception_data(error))
		Solid.post_http('exception', error_data);
	},
	exception_data: function(error) {
		return {
			"additional_data": {
				"application_directory": process.cwd(),
				"node": process.version,
				"env": {
					"args": process.argv,
					"execPath": process.execPath,
					"cwd": process.cwd(),
					"env": process.env,
					"installPrefix": process.installPrefix,
					"pid": process.pid,
					"platform": process.platform,
					"memory": process.memoryUsage()
				}
			},
		"backtrace": error.stack.split("\n"),
			"message": error.message,
			"exception_class": error.stack.split("\n")[0]
		};
	},
	post_http: function(type, data) {

		var headers = {
			'Content-Length' : Buffer.byteLength(data),
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		var path = '/api/exception/'+Solid.secret_key;

		var options = {
			host: Amon.host,
			port: Amon.port,
			path: path,
			method: 'POST',
			headers: headers
		};

		var request = http.request(options, function(response) {
			// For debug purposes only
			//console.log('status: ' + response.statusCode);			  
		})

		//request.on('socket', function (socket) {
			//socket.setTimeout(10);  
			//socket.on('timeout', function() {
				//request.abort();
			//});
		//});
		
		request.write(data);
		request.end();

		request.on('error', function (error) {
			console.log(error.message);
		});
	}
};

exports.Solid = Solid;
