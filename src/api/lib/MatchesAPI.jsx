import axiosMatches from '../apiMatches';


export async function getAllMatches() {
    const res = await axiosMatches.get('/');
    return res;
}
export const saveMatch = (data) => axiosMatches.patch('/', JSON.stringify(data));