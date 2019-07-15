var http = require("http");
var url = require("url");
function app(handle,port) {
  function onReq(request, response) {
    var pathname = url.parse(request.url).pathname;
    if (typeof handle[pathname] === 'function') {

      handle[pathname](request,response);

    } else {

      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("未找到请求处理器" + pathname);
      response.end();

    }
  }
  http.createServer(onReq).listen(port);
}

var router = {}
router["/"] = function(req,res){
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.write("Hello world!");
  res.end();
};
router["/user"] = function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("this's use page!");
}
router["/main"] = function(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("this's main page!");
}
app(router,12450);