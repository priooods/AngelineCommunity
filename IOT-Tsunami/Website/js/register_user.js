let latitude, longitude;
const namaUser = document.getElementById("nameUser");
const phone = document.getElementById("phone");
const notifikasi_success = document.getElementById("alert_success");
const notifikasi_failure = document.getElementById("alert_failure");
const message_success = document.getElementById("message_success");
const message_failure = document.getElementById("message_failure");
const regex = /^[a-zA-Z]+$/;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = "Geolocation is not supported by this browser.";
  responFailure("Geolocation is not supported by this browser.", 2);
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

function registered() {
  if (latitude == null || longitude == null) {
    return responFailure("Harap berikan ijin lokasi anda !", 2);
  }

  if (namaUser.value == null) {
    return responFailure("Harap masukan username anda", 2);
  }

  return new Promise((resolve, rejects) => {
    fetch("http://192.168.1.2:8080/user/add", {
      method: "POST",
      // mode: "no-cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
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

        if (response.success) {
          responFailure(response.message, 1);
        } else {
          responFailure(response.message, 2);
        }
      })
      .catch((err) => {
        rejects(err);
      });
  });
}

function responFailure(message, type) {
  if (type == 2) {
    // failure
    notifikasi_failure.classList.remove("hidden");
    message_failure.innerHTML = message;
    let count = 0;
    const intervals = setInterval(() => {
      count += 1;
      if (count == 5) {
        notifikasi_failure.classList.add("hidden");
        clearInterval(intervals);
      }
    }, 1500);
  } else {
    notifikasi_success.classList.remove("hidden");
    message_success.innerHTML = message;
    let count = 0;
    const intervals = setInterval(() => {
      count += 1;
      if (count == 5) {
        notifikasi_success.classList.add("hidden");
        clearInterval(intervals);
      }
    }, 1500);
  }
}
