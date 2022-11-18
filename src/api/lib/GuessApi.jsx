import axios from "axios";


export const saveGuess = (data, token) => axios.create({
    baseURL: "https://rates-fifa-backend.loca.lt/api/v1/rates/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`,
    },
  }).post('guesses/', JSON.stringify(data));