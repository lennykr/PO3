const handler = (req, res) => {
	const url = req.url;
	const method = req.method;

	if(url === '/') { 
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>  <head> <title>Welcome!</title> </head>  <body>');
		res.write('<h1>Welcome!</h1> ');
		res.write('<form method="POST" action="/create-user">');
		res.write('<input placeholder="username" name="username"/> <input type="submit"/>');
		res.write('</form> </body> </html>');
	}

	if(url === '/users') { 
		res.setHeader('Content-Type', 'text/html');
		res.write('<html>');
		res.write('<head> <title>Users</title> </head>');
		res.write('<body> <ul><li>User 1</li></ul> </body>');
		res.write('</html>');	
	}

	if(url === '/create-user' && method === 'POST') { 
		const body = [];

		req.on('data', (chunk) => {
			body.push(chunk);
		});

		return req.on('end', () => {
			const parsedBody = Buffer.concat(body).toString();
			const username = parsedBody.split('=')[1];

			console.log(username);
			res.statusCode = 302;
			res.setHeader('Location', '/users');
			return res.end();
		});
	}

	res.end();;
};

module.exports = handler;