import CheckoutInformation from "../components/organisms/CheckoutConfirmation/Index";
import CheckoutDetail from "../components/organisms/CheckoutDetail/Index";
import CheckoutItem from "../components/organisms/CheckoutItem/Index";
import Image from "next/image";
import jwtDecode from "jwt-decode";
import { JWTPayloadTypes, UserTypes } from "../services/data-types";

interface checkoutProps {
    user: UserTypes
}

export default function checkout(props: checkoutProps) {
    const {user} = props;

    return (
        <section className="checkout mx-auto pt-md-100 pb-md-145 pt-30 pb-30">
        <div className="container-fluid">
            <div className="logo text-md-center text-start pb-50">
                <a className="" href="#">
                    <Image src="/icon/logo.svg" width={60} height={60} alt="logo" />
                </a>
            </div>
            <div className="title-text pt-md-50 pt-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-10">Checkout</h2>
                <p className="text-lg color-palette-1 mb-0">Waktunya meningkatkan cara bermain</p>
            </div>
            <CheckoutItem />
            <hr />
            <CheckoutDetail />
            <CheckoutInformation />
        </div>
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