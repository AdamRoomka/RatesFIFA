import axiosFifa from '../apiFifa';
// import axios from "axios";

export async function getAllFifa() {
    const res = await axiosFifa.get('/');
    return res;
}