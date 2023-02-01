document.addEventListener("DOMContentLoaded", function (event) {
  var lokasi = document.getElementById("lokasi");
  var list_temperatur = document.getElementById("list-temperatur");
  var list_cuaca = document.getElementById("list-cuaca");
  var list_angin = document.getElementById("list-angin");

  var quake_date = document.getElementById("quake-date");
  var quake_time = document.getElementById("quake-time");
  var quake_lintang = document.getElementById("quake-lintang");
  var quake_bujur = document.getElementById("quake-bujur");
  var quake_magnitude = document.getElementById("quake-magnitude");
  var quake_kedalaman = document.getElementById("quake-kedalaman");
  var quake_area = document.getElementById("quake-area");
  var quake_potensi = document.getElementById("quake-potensi");
  var quake_img = document.getElementById("quake-img");

  new Promise((resolve, rejected) => {
    fetch("https://cuaca-gempa-rest-api.vercel.app/quake")
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          quake_date.innerText = res.data.tanggal;
          quake_time.innerText = res.data.jam;
          quake_lintang.innerText = res.data.lintang;
          quake_bujur.innerText = res.data.bujur;
          quake_magnitude.innerText = res.data.magnitude + " Magnitude";
          quake_kedalaman.innerText = res.data.kedalaman;
          quake_area.innerText = res.data.wilayah;
          quake_potensi.innerText = res.data.potensi;
          quake_img.href = res.data.shakemap;
        }
      });
  });
  new Promise((resolve, rejected) => {
    fetch(
      "https://cuaca-gempa-rest-api.vercel.app/weather/banten/Kota%20Cilegon"
    )
      .then((response) => response.json())
      .then((res) => {
        if (res.success) {
          lokasi.innerText = res.data.description + " - " + res.data.domain;
          for (var i = 0; i < res.data.params[5].times.length; i++) {
            var temperatur = res.data.params[5].times[i];
            var cuaca = res.data.params[6].times[i];
            var angin = res.data.params[8].times[i];
            list_temperatur.innerHTML +=
              '<div class="text-xs flex"><p class="font-semibold text-sm">&#x2022; ' +
              temperatur.celcius +
              '</p> <i class="my-auto ml-1"> - ' +
              new moment(temperatur.datetime, "YYYYMMDDhhmmss").format(
                "DD-MM-YYYY HH:mm"
              ) +
              " </i>  </div>";
            list_cuaca.innerHTML +=
              '<div class="text-xs flex"><p class="font-semibold text-sm">&#x2022; ' +
              cuaca.name +
              '</p> <i class="my-auto ml-1"> - ' +
              new moment(cuaca.datetime, "YYYYMMDDhhmmss").format(
                "DD-MM-YYYY HH:mm"
              ) +
              " </i>  </div>";
            list_angin.innerHTML +=
              '<div class="text-xs flex"><p class="font-semibold text-sm">&#x2022; ' +
              parseInt(angin.mph) +
              ' Mil/Jam</p> <i class="my-auto ml-1"> - ' +
              new moment(angin.datetime, "YYYYMMDDhhmmss").format(
                "DD-MM-YYYY HH:mm"
              ) +
              " </i>  </div>";
          }
        }
        resolve(res);
      })
      .catch((err) => rejected(err));
  });
});