var http = require('http');
var fs = require('fs');
 
var default_host = '127.0.0.1'
var default_port = 2464

var Config = {
	data: function() {
		
		try {
			f = fs.readFileSync('/etc/amon.conf','utf-8');
			this.config = JSON.parse(f);
			
		} catch(err) {
			console.error("Could not open the Amon configuration file: %s", err);
			this.config = false;
		}

		return this.config;

	},
	
	host: function(){
		return this.data().web_app.host ? this.data().web_app.host : default_host;
	},

	port: function(){
		return this.data().web_app.port ? this.data().web_app.port : default_port;
	}

};

exports.Config = Config;

var Amon = {

  VERSION: 0.2,
  host: Config.host(),
  port: Config.port(),

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

  log: function(message, level){
	  level = level || "notset"
	  var log_data = JSON.stringify({
	   "message": message,
	   "level": level
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
          console.log("Error sending log data to Amon ");
          console.log("Please make sure that the web application is running on "+ Amon.host +':'+ Amon.port);
    });
  }
};

exports.Amon = Amon;
