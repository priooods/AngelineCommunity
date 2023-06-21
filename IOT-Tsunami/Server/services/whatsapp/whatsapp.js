import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeInMemoryStore,
  useSingleFileAuthState,
} from "@adiwajshing/baileys";
import { Reply_Register } from "../../utils/template/tmp_whatsapp.js";
import pino from "pino";
// Global Socket
let socket;

const startSession = async () => {
  const logger = pino({ level: "silent" });
  const useStore = !process.argv.includes("--no-store");
  const doReplies = !process.argv.includes("--no-reply");
  const msgRetryCounterMap = {};

  const store = useStore ? makeInMemoryStore({ logger }) : undefined;
  store?.readFromFile(`services/whatsapp/store/store.json`);
  // save setiap 24 hours
  setInterval(() => {
    store?.writeToFile(`services/whatsapp/store/store.json`);
  }, 8888_000);

  const { state, saveState } = useSingleFileAuthState(
    `services/whatsapp/session/session.json`
  );

  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket.default({
    version,
    logger,
    printQRInTerminal: true,
    auth: state,
    browser: ["Warning System Potensi Tsunami", "Chrome", "3.0"],
    msgRetryCounterMap,
  });

  store?.bind(sock.ev);

  sock.ev.on("messages.upsert", async (m) => {
    console.log(JSON.stringify(m, undefined, 2));

    const msg = m.messages[0];
    if (!msg.key.fromMe && m.type === "notify" && doReplies) {
      if (
        msg.message != undefined &&
        msg.message.buttonsResponseMessage != undefined &&
        msg.message.buttonsResponseMessage.selectedButtonId ===
          "register-message" &&
        msg.message.buttonsResponseMessage.selectedDisplayText.toLowerCase() ===
          "konfirmasi"
      ) {
        await sock.readMessages([msg.key])
        await sock.sendMessage(
          m.messages[0].key.remoteJid,
          Reply_Register(msg.pushName)
        );
      }
    }
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    console.log(connection, "connected", lastDisconnect);
    switch (connection) {
      case "close":
        const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        if (shouldReconnect) {
          console.log("🔴 Koneksi terputus, menjalankan ulang ....");
          init();
        }
        break;
      case "connecting":
        console.log("🟡 Whatsapp Socket Connecting ....");
        break;
      case "open":
        console.log("🟢 Whatsapp Socket Connect.");
        break;
      default:
        break;
    }
  });
  sock.ev.on("creds.update", saveState);
  socket = sock;
  return sock;
};

const sendMessage = async (receiver_number, message) => {
  try {
    return await socket.sendMessage(receiver_number + "@s.whatsapp.net", message);
  } catch (err) {
    return Promise.reject(err);
  }
};

const init = async () => {
  startSession();
};

export { init, sendMessage };
