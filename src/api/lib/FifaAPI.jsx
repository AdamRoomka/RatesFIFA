import axiosFifa from '../apiFifa';

export async function getAllTeams() {
    const res = await axiosFifa.get('/');
    return res;
}