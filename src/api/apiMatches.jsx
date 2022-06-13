import axios from 'axios';

const axiosMatches = axios.create({
    baseURL: 'http://localhost:3001/api/v1/rates/matches',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


axiosMatches.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        console.error(res.status);
        return Promise.reject(error);
    }
);

export default axiosMatches;