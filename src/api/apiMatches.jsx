import axios from "axios";

var token=''
const axiosMatches = axios.create({
  baseURL: "https://fifa-rates-backend.loca.lt/api/v1/rates/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`,
  },
});

axiosMatches.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    let res = error.response;
    if (res === undefined) {
      console.error("API not working");
    }
    console.log(res);
    return Promise.reject(error);
  }
);

export default axiosMatches;
