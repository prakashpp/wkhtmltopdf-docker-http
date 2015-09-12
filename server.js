var http = require("http");
var wkhtmltopdf = require('wkhtmltopdf');
var qs = require('querystring');

http.createServer(function(request, response) {
  if (request.method == 'POST') {
    var body = '';
    request.on('data', function (data) {
      body += data;
    });

    request.on('end', function () {
      var post = qs.parse(body);
      if ('html' in post) {
        response.writeHead(200, {
          'Content-Type': 'application/pdf',
        });
        var html = post['html'];
        delete post['html'];
        wkhtmltopdf(html, post, function(code, signal) {
          console.log(code);
          console.log(signal);
          if (code !== null) {
            response.writeHead(500, "Internal Server Error", {'Content-Type': 'text/html'});
            response.end();
            console.log(code);
          }
        }).pipe(response);
      } else {
        response.writeHead(400, "Bad Request", {'Content-Type': 'text/html'});
        response.end();
      };
    });
  } else {
    response.writeHead(200, "OK", {'Content-Type': 'text/html'});
    response.end();
  };
}).listen(5001);

console.log("Server is running at http://127.0.0.1:5001")
