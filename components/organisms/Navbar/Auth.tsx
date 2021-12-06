import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { JWTPayloadTypes } from "../../../services/data-types";
import { useRouter } from "next/router";

export default function Auth() {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({
        avatar: '',
    });

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if(token){
            const jwtToken = atob(token!);
            const payload : JWTPayloadTypes = jwtDecode(jwtToken);
            const userFromPayload = payload.player;
            const IMG = process.env.NEXT_PUBLIC_IMG;
            userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
            setIsLogin(true);
            setUser(userFromPayload);
        }
    }, []);

    const onLogout = () => {
        Cookies.remove("token");
        setIsLogin(false);
        router.push("/");
    }

    if(isLogin){
        return (
            <li className="nav-item my-auto dropdown d-flex">
                <div className="vertical-line d-lg-block d-none"></div>
                <div>
                    <a className="dropdown-toggle ms-lg-40" href="#" role="button" id="dropdownMenuLink"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={user.avatar} className="rounded-circle" width="40" height="40"
                            alt="" />
                    </a>

                    <ul className="dropdown-menu border-0" aria-labelledby="dropdownMenuLink">
                        <li><Link href="/member"><a className="dropdown-item text-lg color-palette-2">My Profile</a></Link></li>
                        <li><Link href="/"><a className="dropdown-item text-lg color-palette-2">Wallet</a></Link></li>
                        <li><Link href="/member/edit-profile">
                            <a className="dropdown-item text-lg color-palette-2">
                                Account Settings
                            </a>
                        </Link></li>
                        <li><a className="dropdown-item text-lg color-palette-2" onClick={onLogout}>Log Out</a></li>
                    </ul>
                </div>
            </li>
        );
    }
    return (
        <Link href="/sign-in">
            <li className="nav-item my-auto">
                <a className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill" role="button">
                    Sign In
                </a>
            </li>
        </Link>
    );
}
