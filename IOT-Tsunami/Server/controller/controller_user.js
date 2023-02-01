import connection from "../services/database/dbconnect.js";
import { sendMessage } from "../services/whatsapp/whatsapp.js";
import { response } from "../utils/respon.js";
import {
  Send_Register,
  Send_Bahaya,
  Send_Normal,
} from "../utils/template/tmp_whatsapp.js";
import fs from "fs";
import env from "dotenv";
import moment from "moment";
env.config();

const NewUser = async (req, res) => {
  var name = req.body.name;
  var phone = req.body.phone;
  var message = req.body.message;
  var longitude = req.body.longitude;
  var latitude = req.body.latitude;
  var created_at = new Date();

  await connection.query(
    "INSERT INTO users (name, phone, latitude, longitude, created_at) VALUES (?,?,?,?,?)",
    [name, phone, latitude, longitude, created_at],
    async (err, results, fields) => {
      if (err) {
        if (err.sqlState == 23000) {
          return response(
            res,
            200,
            false,
            "Nomor yang anda masukan sudah terdaftar pada system !"
          );
        }
      }
      await Send_Register(phone, name);
      response(
        res,
        200,
        true,
        "Kami mengirimkan pesan Whatsapp konfirmasi kepada anda. Harap periksa pesan masuk whatsapp anda dan lakukan konfirmasi untuk mendapatkan notifikasi peringatan"
      );
    }
  );
};

export { NewUser };
