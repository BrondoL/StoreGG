import callAPI from "../config/api";
import { LoginTypes } from "./data-types";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export async function setSignUp(data: FormData) {
    const url = `${ROOT_API}/${API_VERSION}/auth/signup`;

    return callAPI({
        url,
        data,
        method: "POST"
    })
}

export async function setSignIn(data: LoginTypes) {
    const url = `${ROOT_API}/${API_VERSION}/auth/signin`;

    return callAPI({
        url,
        data,
        method: 'POST'
    })
}