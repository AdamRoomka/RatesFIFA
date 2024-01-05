import axiosUsers from "../apiUsers";
import axios from "axios";

export async function getAllUsers(token) {
  const res = await axios
    .create({
      baseURL: "http://localhost:8080/api/v1/rates/users",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`,
      },
    })
    .get("/");
  return res;
}
export async function updatePassword(token, subId, pass) {
  const res = await axios
    .create({
      baseURL: "http://localhost:8080/api/v1/rates/users",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer: ${token}`,
      },
    })
    .post(`/${subId}`, JSON.stringify(pass));
  return res;
}

export const createUser = (data) => axiosUsers.post("/", JSON.stringify(data));
export const doLogin = (data) =>
  axiosUsers.post("/login", JSON.stringify(data));
