

const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
};

const server = http.createServer((req, res) => {
  // Normalize URL — default to index.html
  let urlPath = req.url === "/" ? "/index.html" : req.url;

  // Resolve file path (serve only from current directory)
  const filePath = path.join(__dirname, urlPath);
  const ext      = path.extname(filePath);
  const mimeType = MIME_TYPES[ext] || "text/plain";

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 — File not found");
      return;
    }

    res.writeHead(200, { "Content-Type": mimeType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  [Hidden Logic — CTF Server]`);
  console.log(`  Running at: http://localhost:${PORT}`);
  console.log(`  Press Ctrl+C to stop.\n`);
});