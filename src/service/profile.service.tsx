import client from "./config";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
const cookie = new Cookies();

export async function GetProfile(setProfile: any) {
  return await client
    .get("/user/detail", {
      headers: {
        Authorization: "Bearer " + cookie.get("AUTS"),
      },
    })
    .then((res) => {
      if (res.data.error_code === 0) return setProfile(res.data.data);
      else toast.error("Request failure, Periksa internet koneksi anda");
    })
    .catch((err) => {
      return err;
    });
}
