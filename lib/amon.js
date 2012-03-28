var http = require('http');
var zmq = require('zmq');

var Amon = {
		VERSION: '0.4.0',
		host: "127.0.0.1",
		port: 2464,
		secret: false,
		app_key: false,
        protocol: 'http',

	handle: function(error) {
        if(Amon.protocol == 'zeromq') {
            var zeromq_data = JSON.stringify({
                "content": Amon.exception_data(error),
                "type": 'exception',
                "app_key": Amon.app_key
            });
            Amon.post_zeromq(zeromq_data);
        }
        else if(Amon.protocol == 'http') {
            var error_data = JSON.stringify(Amon.exception_data(error))
		    Amon.post_http('exception', error_data);
        }
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
         
        if(Amon.protocol == 'zeromq') {
            var zeromq_data = JSON.stringify({
                "content": {"message": message, "tags": tags},
                "type": 'log',
                "app_key": Amon.app_key
            });
            Amon.post_zeromq(zeromq_data);
         }
         else if(Amon.protocol == 'http') {
		    var log_data = JSON.stringify({
		        "message": message,
		        "tags": tags
		    });
		    Amon.post_http('log', log_data);
	    }
	},
    post_zeromq: function(data)
    {

        var socket = zmq.socket('dealer');
        socket.connect('tcp://'+Amon.host+':'+Amon.port);
        socket.send(data);
        socket.close();

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

			// Amon Plus support
			if(Amon.app_key != false){ 
				var path = path+'/'+Amon.app_key;
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
		});

			request.write(data);
			request.end();

			request.on('error', function (error) {
                    console.log("" + e.message);
		});
	}
};

exports.Amon = Amon;
