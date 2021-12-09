import axios from "axios";
import callAPI from "../config/api";
import { CheckoutTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export async function getFeaturedGame() {
    const URL = "players/landing-page";

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;

    return axiosResponse.data;
}

export async function getDetailVoucher(id: string) {
    const URL = `players/${id}/detail`;

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;

    return axiosResponse;
}

export async function getGameCategory() {
    const URL = `players/categories`;

    const response = await axios.get(`${ROOT_API}/${API_VERSION}/${URL}`);
    const axiosResponse = response.data;

    return axiosResponse.data;
}

export async function setCheckout(data : CheckoutTypes) {
    const url = `${ROOT_API}/${API_VERSION}/players/checkout`;

    return callAPI({
        url,
        data,
        method: 'POST',
        token: true
    })
}

export async function getMemberOverview() {
    const url = `${ROOT_API}/${API_VERSION}/players/dashboard`;

    return callAPI({
        url,
        method: 'GET',
        token: true
    })
}