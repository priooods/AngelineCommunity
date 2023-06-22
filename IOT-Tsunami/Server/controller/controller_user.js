import connection from "../services/database/dbconnect.js";
import { response } from "../utils/respon.js";
import {
  Konfirm_Register,
  Konfirm_Delete,
} from "../utils/template/tmp_whatsapp.js";
import env from "dotenv";
env.config();

const NewUser = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const created_at = new Date();

  await connection.query(
    "INSERT INTO users (name, phone, latitude, longitude, status, created_at) VALUES (?,?,?,?,?,?)",
    [name, phone, latitude, longitude, 0, created_at],
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
      await Konfirm_Register(phone, name);
      response(
        res,
        200,
        true,
        "Kami mengirimkan pesan Whatsapp konfirmasi kepada anda. Harap periksa pesan masuk whatsapp anda dan lakukan konfirmasi untuk mendapatkan notifikasi peringatan"
      );
    }
  );
};

const FindUserForDelete = async (req, res) => {
  const phone = req.body.phone;

  await connection.query(
    `SELECT * FROM users where phone = ${phone}`,
    async (err, results, fields) => {
      if (err) {
        if (err.sqlState == 23000) {
          return response(
            res,
            200,
            false,
            "Nomor yang anda masukan tidak ditemukan pada system !"
          );
        }
      }
      await Konfirm_Delete(phone, results[0].name);
      response(
        res,
        200,
        true,
        "Kami mengirimkan pesan Whatsapp konfirmasi kepada anda. Harap periksa pesan masuk whatsapp anda dan lakukan konfirmasi untuk menghapus seluruh data"
      );
    }
  );
};

export { NewUser, FindUserForDelete };
