import callAPI from "../config/api";

const ROOT_API = process.env.NEXT_PUBLIC_API;
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export async function getMemberOverview() {
    const url = `${ROOT_API}/${API_VERSION}/players/dashboard`;

    return callAPI({
        url,
        method: 'GET',
        token: true
    })
}

export async function getMemberTransactions(valueParams : string) {
    let params = ''
    if(valueParams === "all"){
        params = '';
    }else{
        params = `?status=${valueParams}`;
    }
    const url = `${ROOT_API}/${API_VERSION}/players/histories${params}`;

    return callAPI({
        url,
        method: 'GET',
        token: true
    })
}