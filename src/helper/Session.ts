import Cookies from "universal-cookie";
const cookie = new Cookies();

export async function setSessionAuth(value: any) {
  return await cookie.set("AUTS", value, {
    secure: true,
  });
}

export function getSessionAuth() {
  return cookie.get("AUTS");
}


export async function removeSessionAuth() {
  return await cookie.remove("AUTS", {
    secure: true,
  });
}