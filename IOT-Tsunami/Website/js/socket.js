import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";
const ketinggianair = document.getElementById("ketinggian-air");
const socket = io("http://192.168.56.1:8080");

socket.on("ketinggian", (msg) => {
  ketinggianair.innerHTML = "";
  ketinggianair.innerHTML = msg;
});
