var http = require('http');

var Amon = {
    VERSION: 0.3
    host: "http://127.0.0.1"
    port: 2464
    secret: false
    app_key: false

  handle: function(error) {
    var error_data = Amon.exception_data_to_json(error);
    Amon.post('exception', error_data);
  },

  exception_data_to_json: function(error) {
    return JSON.stringify({
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
      "exception_class": "node.js exception"
    });
  },

  log: function(message, tags){
	  tags = tags || "notset"
	  var log_data = JSON.stringify({
	   "message": message,
	   "tags": tags
	  });
     Amon.post('log', log_data);
  
  },

  post: function(type, data) {

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

      request.on('error', function () {
          console.log("Error sending log data to Amon on "+path);
          console.log("Please make sure that the web application is running on "+ Amon.host +':'+ Amon.port);
    });
  }
};

exports.Amon = Amon;
