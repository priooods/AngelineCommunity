let latitude, longitude;
var namaUser = document.getElementById("nameUser");
var phone = document.getElementById("phone");
var notifikasi_success = document.getElementById("alert_success");
var notifikasi_failure = document.getElementById("alert_failure");
var message_success = document.getElementById("message_success");
var message_failure = document.getElementById("message_failure");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
}
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

function registered() {
  return new Promise((resolve, reject) => {
    fetch("http://172.16.12.247:8080/user/add", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        name: namaUser.value,
        phone: phone.value,
        latitude: latitude,
        longitude: longitude,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        resolve(response);
        // if (!response.ok) {
        //   throw response;
        // }

        if (response.success) {
          notifikasi_success.classList.remove("hidden");
          message_success.innerHTML = response.message;
          let count = 0;
          const intervals = setInterval(() => {
            count += 1;
            if (count == 5) {
              notifikasi_success.classList.add("hidden");
              clearInterval(intervals);
            }
          }, 1500);
        } else {
          notifikasi_failure.classList.remove("hidden");
          message_failure.innerHTML = response.message;
          let count = 0;
          const intervals = setInterval(() => {
            count += 1;
            if (count == 5) {
              notifikasi_failure.classList.add("hidden");
              clearInterval(intervals);
            }
          }, 1500);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}
