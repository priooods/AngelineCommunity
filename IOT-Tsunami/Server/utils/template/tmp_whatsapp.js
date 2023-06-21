import { sendMessage } from "../../services/whatsapp/whatsapp_wpp.js";


const Send_Register = async (phone, name) => {
  await sendMessage(
    `62${phone}@c.us`,
    `Hallo *${name}*.\n\nTerimakasih telah mendaftarkan diri anda pada *Warning System Potensi Tsunami*. Kami akan mengirimkan pesan perihal informasi potensi Tsunami kepada anda secara berkala per 6 hari.\n`
  );
  return true;
};

const Reply_Register = (name) => {
  return `Terimakasih *${name}* atas konfirmasi nya.\n\nKami akan secara automatis mengirimkan informasi terkait *Potensi Tsunami* kepada anda secara berkala.`;
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

export { Send_Register, Reply_Register, Send_Bahaya, Send_Normal, Send_Antara };
