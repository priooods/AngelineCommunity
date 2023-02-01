import { sendMessage } from "../../services/whatsapp/whatsapp.js";

const Send_Register = async (phone = "8983554798", name) => {
  await sendMessage(`62${phone}`, {
    text: `Hallo *${name}*.\n\nTerimakasih telah mendaftarkan diri ada pada *Warning System Potensi Tsunami*. Kami memerlukan konfirmasi anda untuk system mengirimkan pesan perihal informasi potensi Tsunami.\n`,
    footer: "Tap tombol konfirmasi untuk memberikan ijin",
    viewOnce: true,
    buttons: [
      {
        buttonId: "register-message",
        buttonText: { displayText: "Konfirmasi" },
        type: 1,
      },
    ],
    headerType: 1,
  });
  return true;
};

const Reply_Register = (name) => {
  return {
    text: `Terimakasih *${name}* atas konfirmasi nya.\n\nKami akan secara automatis mengirimkan informasi terkait *Potensi Tsunami* kepada anda secara berkala.`,
  };
};

const Send_Bahaya = async (phone = "8983554798", name, tinggi_air) => {
  await sendMessage(`62${phone}`, {
    text: `⛔️ *BAHAYA POTENSI TSUNAMI* ⛔️\n\nHallo *${name}*.\n\nSystem mendeteksi ada perubahan ketinggian air laut yang tidak lazim, saat ini ketinggian air terdeteksi ( *+- ${tinggi_air} meter* ) dan *berpotensi Tsunami*.\n\nPastikan anda untuk tetap tenang dalam melakukan evakuasi, periksa jalur aman yang dianjurkan untuk evakuasi pada link dibawah dan periksa secara berkala pada halaman website *BMKG* atau halaman *Warning System Potensi Tsunami ( WSPT )*`,
    footer: "Tap tombol link dibawah",
    viewOnce: true,
    templateButtons: [
      {
        index: 1,
        urlButton: {
          displayText: "Jalur Evakuasi",
          url: "https://google.com/",
        },
      },
      {
        index: 2,
        urlButton: {
          displayText: "Link BMKG",
          url: "https://google.com/",
        },
      },
      {
        index: 3,
        urlButton: {
          displayText: "Lihat CCTV System",
          url: "https://google.com/",
        },
      },
    ],
  });
  return true;
};

const Send_Normal = async (phone = "8983554798", name, tinggi_air) => {
  await sendMessage(`62${phone}`, {
    text: `*INFORMASI PER 6 HARI*\n\nHallo *${name}*, ini adalah pesan automatis.\n\nSystem mendeteksi ketinggian air laut ( *+- ${tinggi_air} meter* ) dan *tidak berpotensi Tsunami*.\n\Monitoring secara berkala keadaan sekitar system terpasang pada halaman website *Warning System Potensi Tsunami ( WSPT )*`,
    footer: "Tap tombol link dibawah",
    viewOnce: true,
    templateButtons: [
      {
        index: 3,
        urlButton: {
          displayText: "Lihat CCTV System",
          url: "https://google.com/",
        },
      },
    ],
  });
  return true;
};

const Send_Antara = async (phone = "8983554798", name, tinggi_air) => {
  await sendMessage(`62${phone}`, {
    text: `⛔️ *PENURUNAN KETINGGIAN AIR LAUT* ⛔️\n\nHallo *${name}*.\n\nSystem mendeteksi ada perubahan ketinggian air laut yang tidak lazim, saat ini ketinggian air terdeteksi ( *+- ${tinggi_air} meter* ) \n\nSegera buka link dibawah dan periksa secara berkala pada halaman website *BMKG* atau halaman *Warning System Potensi Tsunami ( WSPT )*, \n\nKami menyarankan anda untuk mempelajari jalur evakuasi yang disediakan oleh BMKG pada link dibawah`,
    footer: "Tap tombol link dibawah",
    viewOnce: true,
    templateButtons: [
      {
        index: 1,
        urlButton: {
          displayText: "Jalur Evakuasi",
          url: "https://google.com/",
        },
      },
      {
        index: 2,
        urlButton: {
          displayText: "Link BMKG",
          url: "https://google.com/",
        },
      },
      {
        index: 3,
        urlButton: {
          displayText: "Lihat CCTV System",
          url: "https://google.com/",
        },
      },
    ],
  });
  return true;
};

export { Send_Register, Reply_Register, Send_Bahaya, Send_Normal, Send_Antara };
