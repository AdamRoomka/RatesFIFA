import axiosUsers from '../apiUsers';
import axios from "axios";


export async function getAllUsers(token) {
    const res = await axios.create({
        baseURL: "https://rates-fifa-backend.loca.lt/api/v1/rates/users",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer: ${token}`,
        },
    }).get('/')
    return res;
}
export async function updatePassword(token, subId, pass) {
    const res = await axios.create({
        baseURL: "https://rates-fifa-backend.loca.lt/api/v1/rates/users",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer: ${token}`
        },
    }).post(`/${subId}`, JSON.stringify(pass))
    return res;
}

// export async function getUserAdmin(token) {
//     const res = await axios.create({
//         baseURL: "https://rates-fifa-backend.loca.lt/api/v1/rates/users",
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//           Authorization: `Bearer: ${token}`,
//         },
//       }).post('/....');
//     return res;
// }

export const createUser = (data) => axiosUsers.post('/', JSON.stringify(data));
// export const updatePassword = (subId, data) => axiosUsers.post(`/${subId}`, JSON.stringify(data));
export const doLogin = (data) => axiosUsers.post('/login', JSON.stringify(data));