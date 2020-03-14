const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');
const port = process.env.PORT || 8002;

// http
const server = http.createServer(function(req, res)
{
	if (req.url == '/')
	{
		fs.readFile('./index.html', function(err, content)
		{
			console.log('Serving index.html');
			res.writeHead(200, { 'Content-Type': 'text/html', 'Content-Length': content.length });
			res.write(content);
			res.end();
		});
	}
	else
	{
		console.log('Error 404');
		let message404 = 'There is no such page!';
		res.writeHead(404, { 'Content-Type': 'text/html', 'Content-Length': message404.length });
		res.write(message404);
		res.end();
	}
});

// WebSocket
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws)
{
	console.log('Client connected');
	
	ws.on('close', function()
	{
		console.log('Client disconnected');
	});

	ws.on('message', function()
	{
		console.log('Ping received, sending pong');
		ws.send('pong');
	});
});

server.listen(port);

console.log('Listening to %d', port);

