var HTTP = require('http');
var fs = require('fs');

var Amon = {

  VERSION: 0.1,
  Host: "127.0.0.1",
  Port: 2464,

  handle: function(error) {
    var error_data = Amon.to_json(error);
    Amon.post('exception', error_data);
  },

  error_json: function(error) {
    return JSON.stringify({
      "application_environment": {
        "application_root_directory": process.cwd(),
        "framework": "node" + process.version,
        "env": {
          "args": process.argv,
          "execPath": process.execPath,
          "cwd": process.cwd(),
          "env": process.env,
          "gid": process.getgid(),
          "uid": process.getuid(),
          "version": process.version,
          "installPrefix": process.installPrefix,
          "pid": process.pid,
          "platform": process.platform,
          "memory": process.memoryUsage()
        }
      },

      "exception": {
        "occurred_at": new Date(),
        "message": error.message,
        "backtrace": error.stack.split("\n"),
        "exception_class": "node"
      },
    });
  },

  post: function(type, data) {

      var client  = HTTP.createClient(Amon.Port, Amon.Host);

      var headers = {
        'Content-Length' : data.length
      };

      var request = client.request('POST', '/api/log', headers);

      request.write(data);
      request.end();

      request.on('response', function (response) {
        if (response.statusCode === 200) {
          console.log("Error data successfully sent to exceptional");
        } else {
          console.log("Error sending to api.getexceptional.com :" + response.statusCode);
        }
    });
  }
};

exports.Amon = Amon;
