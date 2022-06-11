import axiosMatches from '../apiMatches';


export async function getAllMatches() {
    const res = await axiosMatches.get('/');
    return res;
}