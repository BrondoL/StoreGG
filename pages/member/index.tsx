import OverviewContent from "../../components/organisms/OverviewContent/Index";
import Sidebar from "../../components/organisms/Sidebar/Index";
import jwtDecode from "jwt-decode";
import { JWTPayloadTypes } from "../../services/data-types";

export default function Overview() {
    return (
        <section className="overview overflow-auto">
        <Sidebar activeMenu="overview" />
        <OverviewContent />
        </section>
    )
}

interface GetServerSideProps {
    req: {
        cookies: {
            token: string;
        }
    }
}

export async function getServerSideProps({req} : GetServerSideProps) {
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
    return {
        props: {
            user: userFromPayload,
        }
    }
}