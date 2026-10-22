import { createServer } from "http"
import next from "next"
import { parse } from "url";
import { createPlaygroundServer } from "websocket-playground/server";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const playground = createPlaygroundServer();

app.prepare().then(() => {
  const upgradeHandler = app.getUpgradeHandler();
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  server.on("upgrade", (request, socket, head) => {
    const { pathname } = parse(request.url);

    if (playground.handleUpgrade(request, socket, head, pathname)) return;

    if (pathname === "/_next/webpack-hmr") {
      upgradeHandler(request, socket, head);
    } else {
      socket.destroy(); // 잘못된 경로는 연결 거부
    }
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on port 3000");
  });
});
