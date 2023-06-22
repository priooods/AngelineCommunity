const phone = document.getElementById("phone");
const notifikasi_success = document.getElementById("unsub_alert_success");
const notifikasi_failure = document.getElementById("unsub_alert_failure");
const message_success = document.getElementById("unsub_message_success");
const message_failure = document.getElementById("unsub_message_failure");

function unsubcribe() {
  if (phone.value == null) {
    return responFailure("Harap masukan nomor anda", 2);
  }

  return new Promise((resolve, rejects) => {
    fetch("http://192.168.1.2:8080/user/remove", {
      method: "POST",
      // mode: "no-cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone.value,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        resolve(response);
        console.log(response, "unsub");
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
