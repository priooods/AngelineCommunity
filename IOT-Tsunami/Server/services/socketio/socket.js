import { Server } from "socket.io";
import { sendingMessageSocket } from "../../controller/controller_wa.js";
const socketServer = (app) => {
  const io = new Server(app, {
    cors: {
      origin: "*",
      transports: ["websocket", "polling"],
      credentials: true,
    },
    allowEIO3: true,
  });

  io.on("connection", async (socket) => {
    const arr = [];
    const sockets = await io.fetchSockets();
    for (const sock of sockets) {
      arr.push(sock.id);
    }
    console.log({
      socket: {
        id: arr,
      },
    });
    socket.on("broadcast", async (msg) => {
      const message = msg.ketinggian;
      switch (message) {
        case 1:
          io.emit("ketinggian", 25); // Normal
          await sendingMessageSocket(25);
          break;
        case 2:
          io.emit("ketinggian", 15); // Antara
          await sendingMessageSocket(15);
          break;
        case 3:
          io.emit("ketinggian", 5); // Prosess Surut
          await sendingMessageSocket(5);
          break;
        case 4:
          io.emit("ketinggian", 30); // Tsunami
          await sendingMessageSocket(30);
          break;
      }
    });

    // when socket disconnected
    socket.on("disconnect", () => {
      console.log("disconnected user", socket.id);
    });
  });

  return io;
};


export default socketServer;
