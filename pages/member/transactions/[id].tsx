import jwtDecode from "jwt-decode";
import TransactionDetailContent from "../../../components/organisms/TransactionDetailContent/Index";
import { HistoryTransactionTypes, JWTPayloadTypes } from "../../../services/data-types";
import { getTransactionDetail } from "../../../services/member";

interface TransactionsDetailProps {
    transactionDetail: HistoryTransactionTypes
}

export default function TransactionsDetail(props : TransactionsDetailProps) {
    const { transactionDetail } = props;
    return (
        <section className="transactions-detail overflow-auto">
        <TransactionDetailContent data={transactionDetail} />
    </section>
    )
}

interface GetServerSideProps {
    req: {
        cookies: {
            token: string;
        }
    },
    params: {
        id: string;
    }
}

export async function getServerSideProps({req, params} : GetServerSideProps) {
    const {token} = req.cookies;
    if(!token){
        return {
            redirect: {
                destination: '/sign-in',
                permanent: false,
            }
        }
    }

    const jwtToken = Buffer.from(token, 'base64').toString('ascii');
    const payload : JWTPayloadTypes = jwtDecode(jwtToken);
    const userFromPayload = payload.player;
    const IMG = process.env.NEXT_PUBLIC_IMG;
    userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

    const { id } = params;
    const response = await getTransactionDetail(id, jwtToken);

    return {
        props: {
            transactionDetail: response.data,
        }
    }
}