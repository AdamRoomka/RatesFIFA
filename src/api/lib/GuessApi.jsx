import axios from "axios";


export const saveGuess = (data, token) => axios.create({
    baseURL: "http://localhost:5002/api/v1/rates/",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer: ${token}`,
    },
  }).post('guesses/', JSON.stringify(data));