var exec = require("child_process").exec;
var fs = require("fs");
var querystring = require("querystring");

function start(response, postData) {
	console.log("Request handler 'start' was called.");
	exec("ls -alh", function(error, stdout, stderr){
		response.writeHead(200, {"Content-Type": "text/plain"});
		response.write(stdout);
		response.end();
	});
}

function upload(response, postData) {
	console.log("Request handler 'upload' was called.");
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("You've sent: " + querystring.parse(postData).text);
	response.end();
}

function textpad(response, postData) {
	console.log("Request handler 'textpad' was called.");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write(fs.readFileSync("textpad.html").toString());
	response.end();
}

function show(response, postData) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {"Content-Type": "text/plain"});
            response.write(error + "\n");
            response.end();
        }
        else {
            response.writeHead(200, {"Content-Type": "image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.textpad = textpad;
exports.show = show;
