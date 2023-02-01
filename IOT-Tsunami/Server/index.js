import express from "express";
import bodyParser from "body-parser";
import http from "http";
import ip from "ip";
import env from "dotenv";
import RouterUser from "./router/route_user.js";
import { init } from "./services/whatsapp/whatsapp.js";
import socketServer from "./services/socketio/socket.js";
const app = express();

const httpServer = http.createServer(app);
env.config();
const port = process.env.PORT || 8000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) res.sendStatus(200);
  else next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", RouterUser);
socketServer(httpServer);

const callback = async () => {
  await init();
  console.log(
    `Server is listening on http://${
      ip.address() ? ip.address() : "localhost"
    }:${port}`
  );
};

httpServer.listen(port, ip.address(), callback());
export default app;
