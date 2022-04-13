import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8032",
});

export default client;
