import { User } from "../interface/User";
import client from "./config";
import { setSessionAuth } from "../helper/Session";
import toast from "react-hot-toast";

export async function UserLogin(body: User, navigate: any) {
  return await client
    .post("/auth/login", body)
    .then((response: any) => {
      if (response.data.error_code === 0) {
        setSessionAuth(response.data.data.token);
        toast.success("Selamat datang kembali");
        return navigate("/");
      } else return toast.error(response.data.data);
    })
    .catch((err) => console.log(err, "error"));
}

export async function UserRegister(body: User, navigate: any) {
  return await client
    .post("/auth/register", body)
    .then((response: any) => {
      if (response.data.error_code === 0) {
        toast.success(response.data.data);
        return navigate("/login");
      } else return toast.error(response.data.data);
    })
    .catch((err) => console.log(err, "error"));
}
