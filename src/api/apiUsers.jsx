import axios from 'axios';

const axiosUsers = axios.create({
    baseURL: 'http://localhost:5002/api/v1/rates/users',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});


axiosUsers.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        let res = error.response;
        if(res === undefined) {
            console.error("API not working")
        }
        console.log(res);
        // console.error(res.status);
        return Promise.reject(error);
    }

);

export default axiosUsers;