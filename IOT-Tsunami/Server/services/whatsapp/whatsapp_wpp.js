import {create} from "@wppconnect-team/wppconnect";
import moment from "moment";
let wa;
const startSession = () => {
    return create({
      session: "wspt",
      defaultLogger: {
        level: 'silly'
      },
      statusFind: (statusSession, session) => {
        console.log("Status Session: ", statusSession);
        console.log("Session name: ", session);
      },
      devtools: false, // Open devtools by default
      useChrome: true, // If false will use Chromium instance
      debug: true, // Opens a debug session
      logQR: true, // Logs QR automatically in terminal
      browserWS: "", // If u want to use browserWSEndpoint
      browserArgs: [""], // Parameters to be added into the chrome browser instance
      puppeteerOptions: {
        userDataDir: "./services/whatsapp/store", // or your custom directory
      },
      disableWelcome: true, // Option to disable the welcoming message which appears in the beginning
      updatesLog: true, // Logs info updates automatically in terminal
      autoClose: 60000,
    })
      .then((client) => {
        wa = client;
        start(client);
      })
      .catch((error) => console.log(error));
}

function start(client) {
  client.onMessage((message) => {
    console.log(message,"msg");
  });
}

const sendMessage = async (receiver_number, message) => {
  try {
    console.log(
      "sending to: " + receiver_number,
      moment().format("dddd, MM DD YYYY, h:mm:ss a")
    );
    return await wa
      .sendText(receiver_number, message)
      .then((result) => {
        console.log(
          "receive for: " + receiver_number,
          moment().format("dddd, MM DD YYYY, h:mm:ss a")
        );
        console.log(
          "timestamp send: " + receiver_number,
          moment(message.timestamp).format("dddd, MM DD YYYY, h:mm:ss a")
        );
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro); //return object error
      });
  } catch (err) {
    return Promise.reject(err);
  }
};

const init = async () => {
  await startSession();
};

export { init, sendMessage };