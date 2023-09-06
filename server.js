// const { exec } = require("child_process");

// // Sử dụng child_process để chạy lệnh npm start trên cổng 6000
// const child = exec("npx next start -p 7070");

// child.stdout.on("data", (data) => {
//   console.log(data);
// });

// child.stderr.on("data", (data) => {
//   console.error(data);
// });

// child.on("close", (code) => {
//   console.log(`Child process exited with code ${code}`);
// });

// process.on("exit", () => {
//   // Khi tiến trình thoát, hãy chắc chắn kết thúc tiến trình con (npm start)
//   child.kill();
// });

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false;
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/a") {
        await app.render(req, res, "/a", query);
      } else if (pathname === "/b") {
        await app.render(req, res, "/b", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
