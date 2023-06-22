import connection from "../services/database/dbconnect.js";
import {
  Send_Normal,
  Send_Bahaya,
  Send_Antara,
  Send_Register,
  Send_Delete,
} from "../utils/template/tmp_whatsapp.js";
import fs from "fs";
import env from "dotenv";
import moment from "moment";
env.config();

const sendingMessageSocket = async (type, ketinggian) => {
  connection.query(
    "SELECT * FROM users where status = 1",
    async function (err, results, fields) {
      for (const data of results) {
        if (type == 3 || type == 4)
          await Send_Bahaya(data.phone, data.name, ketinggian);
        if (type == 1) {
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
        }
        if (type == 2)
          // ANTARA
          await Send_Antara(data.phone, data.name, ketinggian);
      }
    }
  );
};

const replyConfirm = async (from, name) => {
  const phone = from.substring(2, from.length - 5);
  connection.query(
    `UPDATE users SET status = 1 where phone = ${phone} AND status = 0`,
    async function (err, results, fields) {
      if (results.changedRows == 1) {
        await Send_Register(phone, name);
      } else {
        return;
      }
    }
  );
};

const replyDelete = async (from, name) => {
  const phone = from.substring(2, from.length - 5);
  connection.query(
    `DELETE FROM users where phone = ${phone}`,
    async function (err, results, fields) {
      if (results.affectedRows == 1) {
        await Send_Delete(phone, name);
      } else {
        return;
      }
    }
  );
};

export { sendingMessageSocket, replyConfirm, replyDelete };
