import { sendMessage } from "../../services/whatsapp/whatsapp_wpp.js";


const Send_Register = async (phone, name) => {
  await sendMessage(
    `62${phone}@c.us`,
    `Hallo *${name}*.\n\nTerimakasih telah mendaftarkan diri anda pada *Warning System Potensi Tsunami*. Kami akan mengirimkan pesan perihal informasi potensi Tsunami kepada anda secara berkala per 6 hari.\n`
  );
  return true;
};

const Konfirm_Register = async (phone, name) => {
  await sendMessage(
    `62${phone}@c.us`,
    `Hallo *${name}*.\n\nUntuk memastikan bahwa nomer yang didaftarkan pada *Warning System Potensi Tsunami* adalah benar anda. Kami memerlukan konfirmasi anda.\n\nBalas pesan ini dengan kata *KONFIRMASI* untuk terhubung dengan system.\n`
  );
  return true;
};

const Konfirm_Delete = async (phone, name) => {
  await sendMessage(
    `62${phone}@c.us`,
    `Hallo *${name}*.\n\nUntuk memastikan permintaan penghapusan data pada *Warning System Potensi Tsunami* adalah benar anda. Kami memerlukan konfirmasi anda.\n\nBalas pesan ini dengan kata *HAPUS DATA* untuk menghapus semua data anda di system.\n`
  );
  return true;
};

const Send_Delete = async (phone, name) => {
  await sendMessage(
    `62${phone}@c.us`,
    `Data anda telah dibersihkan.\n\nTerimakasih *${name}* telah mempercayai *Warning System Potensi Tsunami*. Kami menunggu anda kembali.`
  );
  return true;
};

const Send_Bahaya = async (phone, name, tinggi_air) => {
  await sendMessage(
    `62${phone}@c.us`,
    `⛔️ *BAHAYA POTENSI TSUNAMI* ⛔️\n\nHallo *${name}*.\n\nSystem mendeteksi ada perubahan ketinggian air laut yang tidak lazim, saat ini ketinggian air terdeteksi ( *+- ${tinggi_air} meter* ) dan *berpotensi Tsunami*.\n\nPastikan anda untuk tetap tenang dalam melakukan evakuasi, periksa jalur aman yang dianjurkan untuk evakuasi pada link dibawah dan periksa secara berkala pada halaman website *BMKG* atau halaman *Warning System Potensi Tsunami ( WSPT )*\n\n*Lihat CCTV System*\nhttps://t.ly/9_Ok\n\n*Realtime BMKG*\nhttps://t.ly/H6jF\n\n*Jalur Evakuasi*\nhttps://t.ly/sc8u`
  );
  return true;
};

const Send_Normal = async (phone, name, tinggi_air) => {
  await sendMessage(
    `62${phone}@c.us`,
    `⛔️ *INFORMASI PER 6 HARI* ⛔️\n\nHallo *${name}*, ini adalah pesan automatis.\n\nSystem mendeteksi ketinggian air laut ( *+- ${tinggi_air} meter* ) dan *tidak berpotensi Tsunami*.\n\nMonitoring secara berkala keadaan sekitar system terpasang pada halaman website *Warning System Potensi Tsunami ( WSPT )*\n\nklik link dibawah:\n\n*Lihat CCTV System*\nhttps://t.ly/9_Ok`
  );
  return true;
};

const Send_Antara = async (phone, name, tinggi_air) => {
  await sendMessage(
    `62${phone}@c.us`,
    `⛔️ *PENURUNAN KETINGGIAN AIR LAUT* ⛔️\n\nHallo *${name}*.\n\nSystem mendeteksi ada perubahan ketinggian air laut yang tidak lazim, saat ini ketinggian air terdeteksi ( *+- ${tinggi_air} meter* ) \n\nSegera buka link dibawah dan periksa secara berkala pada halaman website *BMKG* atau halaman *Warning System Potensi Tsunami ( WSPT )*, \n\nKami menyarankan anda untuk mempelajari jalur evakuasi yang disediakan oleh BMKG pada link dibawah \n\n*Lihat CCTV System*\nhttps://t.ly/9_Ok\n\n*Realtime BMKG*\nhttps://t.ly/H6jF\n\n*Jalur Evakuasi*\nhttps://t.ly/sc8u`
  );
  return true;
};

export {
  Send_Register,
  Konfirm_Register,
  Send_Bahaya,
  Send_Normal,
  Send_Antara,
  Konfirm_Delete,
  Send_Delete,
};
