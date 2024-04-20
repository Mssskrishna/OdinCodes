const http = require('http');
const { readFile } = require('fs').promises;
const { URL } = require('url');

async function serveFile(filename, res) {
    try {
        const data = await readFile(filename);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
    } catch (err) {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
    }
}

const routes = {
    "/": "index.html",
    "/about": "about.html",
    "/contact": "contact-me.html",
}

http.createServer(async (req, res) => {
    const { pathname } = new URL(req.url, 'http://localhost/');
    const filename = routes[pathname] || "404.html";
    await serveFile(filename, res);
}).listen(8080);
