import { jwtDecode } from "jwt-decode";
export function UserData() {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }
  return null;
}