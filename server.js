const http = require("http");
const fs   = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
};

const server = http.createServer((req, res) => {
  let urlPath = req.url === "/" ? "/index.html" : req.url;
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

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[Hidden Logic] Server running on port ${PORT}`);
});
