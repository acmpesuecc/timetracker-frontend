import Cookies from "universal-cookie";

export default function isLoggedIn() {
  const cookies = new Cookies();
  return !!cookies.get("ath");
}
