import axios from "axios";

export async function getFeaturedGame() {
    const ROOT_API = process.env.NEXT_PUBLIC_API;
    const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;
    const URL = "players/landing-page";

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;

    return axiosResponse.data;
}

export async function getDetailVoucher() {
    return null;
}