import axiosMatches from '../apiMatches';
import axios from "axios";


export async function getAllMatchesGroup(token) {
    const res = await axios.create({
        baseURL: "https://rates-fifa-backend.loca.lt/api/v1/rates/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      }).get('/matches?type=group_stage');
    return res;
}
export async function getAllMatchesPlayoff(token) {
    const res = await axios.create({
        baseURL: "https://rates-fifa-backend.loca.lt/api/v1/rates/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      }).get('/matches?type=play-off');
    return res;
}
export async function getAllMatches(token) {
    const res = await axios.create({
        baseURL: "https://rates-fifa-backend.loca.lt/api/v1/rates/",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer: ${token}`,
        },
      }).get('/matches');
    return res;
}


export const saveMatch = (data) => axiosMatches.post('/matches/', JSON.stringify(data));
export const deleteMatches = (matchId) => axiosMatches.delete(`/matches/${matchId}`);
export const endMatchRes = (id, data) => axiosMatches.post(`/matches/${id}`, JSON.stringify(data));