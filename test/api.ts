import axios from "axios";

export async function login(username: string, password: string) {
    const res = await axios.post('http://localhost:3000/api/authenticate', {
        username,
        password,
    });
    return res.data;
}