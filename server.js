var http = require('http');


var rex = /^\/greet\/(\w+)$/i;

var server = http.createServer(function(req, res) {
  
  //console.log('\nreq.url is: ' + req.url);
  //console.log('req.method is: ' + req.method);

  if (req.url === '/time') {
    var date = new Date();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: date}));
    //console.log('response: '+ date);
    res.end();
  }
  


  else if (req.url.indexOf('/greet') !== -1) {

    if(req.method === 'POST') {
      var str = '';
      req.on('data', function(data) {
        str += data;
      });

      req.on('end', function(data) {
        var body = JSON.parse(str.toString('utf-8'));
        if (body.name) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify({msg: 'hello, ' + body.name}));
          //console.log('response: '+ 'hello, ' + body.name);
          res.end();
        }
      });

      } else {

      var match = rex.exec(req.url);
      var text = match !== null ? 'hello, ' + match[1] : 'sorry, that\'s an invalid name';
      res.writeHead( match !== null ? 200 : 404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({msg: text}));
      //console.log('response: '+ text);
      res.end();

      } 

  } else {
    res.writeHead(404, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg: 'could not find page'}));
    //console.log('response: ' + 'could not find page');
    res.end();
  }
});  



  server.listen(3000, function() {
  console.log('server started');

});