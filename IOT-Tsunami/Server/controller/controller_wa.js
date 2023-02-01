import connection from "../services/database/dbconnect.js";
import { sendMessage } from "../services/whatsapp/whatsapp.js";
import { response } from "../utils/respon.js";
import {
  Send_Normal,
  Send_Bahaya,
  Send_Antara,
} from "../utils/template/tmp_whatsapp.js";
import fs from "fs";
import env from "dotenv";
import moment from "moment";
env.config();

const sendingMessageSocket = async (ketinggian) => {
  connection.query(
    "SELECT * FROM users",
    async function (err, results, fields) {
      for (const data of results) {
        if (ketinggian == 30 || ketinggian == 5)
          await Send_Bahaya(data.phone, data.name, ketinggian);
        if (ketinggian == 25) {
          const content = fs.readFileSync(process.env.LOGTIME, {
            encoding: "utf8",
            flag: "r",
          });
          // Mengirim Wa setiap 6 hari sekali
          const result = JSON.parse(content);
          const addhours = moment(result.report, "YYYY/MM/DD HH:mm")
            .add(6, "days")
            .format("YYYY/MM/DD HH:mm");
          const nows = moment().format("YYYY/MM/DD HH:mm");
          if (addhours == nows) {
            fs.writeFileSync(
              process.env.LOGTIME,
              JSON.stringify({ report: nows })
            );
            await Send_Normal(data.phone, data.name, ketinggian);
          }
        } else {
          // ANTARA
          await Send_Antara(data.phone, data.name, ketinggian);
        }
      }
    }
  );
};

export { sendingMessageSocket };
