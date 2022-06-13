import axiosFifa from '../apiFifa';
// import axios from "axios";

export async function getAllTeams() {
    const res = await axiosFifa.get('/');
    return res;
}