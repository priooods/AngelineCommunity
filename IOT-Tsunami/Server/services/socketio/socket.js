import { Server } from "socket.io";
import { sendingMessageSocket } from "../../controller/controller_wa.js";
import moment from "moment";
const socketServer = (app) => {
  const io = new Server(app, {
    cors: {
      origin: "*",
    },
    serveClient: false,
    // allowEIO3: true,
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
      const key = msg.key ?? null;
      const type = msg.type ?? null;
      const ktg = msg.ketinggian ?? null;

      if (key == null)
        return console.log({
          message: "Your process blocked !",
          data: null,
        });
      
      if (key !== "n0d3mcU")
        return console.log({
          message: "message not from NodeMCU. your process blocked !",
          data: null,
        });

      // debugging socket receive messages
      console.log({
        message: "receive message from NodeMCU",
        data: {
          type: type,
          ketinggian: ktg,
        },
      });

      io.emit("ketinggian", ktg); // Broadcast Ke Animasi Ombak di Web
      console.log({
        message: "Sending realtime message to update Website",
        data: {
          type: type,
          ketinggian: ktg,
        },
      });
      await sendingMessageSocket(type, ktg); // Broadcast notifikasi whatsapp

      console.log({
        message: 'All socket succesfully broadcast to website & whatsapp',
        timestamp: moment().format("HH:mm:ss")
      })
    });

    // when socket disconnected
    socket.on("disconnect", () => {
      console.log("disconnected user", socket.id);
    });
  });

  return io;
};


export default socketServer;
