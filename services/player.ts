import axios from "axios";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export async function getFeaturedGame() {
    const URL = "players/landing-page";

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;

    return axiosResponse.data;
}

export async function getDetailVoucher(id:string) {
    const URL = `players/${id}/detail`;

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;

    return axiosResponse;
}