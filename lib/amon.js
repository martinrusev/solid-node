var http = require('http');

var Amon = {
		VERSION: '0.5.0',
		host: "127.0.0.1",
		port: 2464,
		secret_key: false,
        protocol: 'http',

	handle: function(error) {
        var error_data = JSON.stringify(Amon.exception_data(error))
	    Amon.post_http('exception', error_data);
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
	log: function(message, tags){
		tags = tags || "notset"
         
	    var log_data = JSON.stringify({
	        "message": message,
	        "tags": tags
	    });


	    Amon.post_http('log', log_data);
	},
	post_http: function(type, data) {

        var headers = {
            'Content-Length' : data.length,
            'Content-Type': 'application/x-www-form-urlencoded'
        };

		if(type == 'exception'){
			var path = '/api/exception'
		}
		else {
			var path = '/api/log'
		}

        if(Amon.secret_key != false){ 
            var path = path+'/'+Amon.secret_key;
        }

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
            console.log(e.message);
		});
	}
};

exports.Amon = Amon;
