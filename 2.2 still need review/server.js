const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((request, response) => {
    const addr = request.url;
    const q = url.parse(addr, true);
    let filePath = "";

    fs.appendFile(
        "log.txt",
        `URL: ${addr}\nTimestamp: ${new Date()}\n\n`,
        (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log("Added to log.");
            }
        }
    );

    if (q.pathname.includes("documentation")) {
        filePath = `${__dirname}/documentation.html`;
    } else {
        filePath = `${__dirname}/index.html`;
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(err);
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.write("404 Not Found");
        } else {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.write(data);
        }
        response.end();
    });
});

server.listen(8080, () => {
    console.log("My test server is running on Port 8080.");
});
