import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { setSignIn } from "../../../services/auth";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";

export default function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const onSubmit = async () => {
        setLoading(true);
        const data = {
            email,
            password
        }
        if(!email || !password){
            toast.error("Email dan Password wajib diisi !!")
        }else{
            const response = await setSignIn(data);
            if(response.error){
                toast.error(response.message);
            }else{
                const token = response.data;
                const tokenBase64 = btoa(token);
                Cookies.set("token", tokenBase64, {expires: 1});
                router.push("/");
            }
        }
        setLoading(false);
    }

    return (
        <div>
            <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
            <p className="text-lg color-palette-1 m-0">Masuk untuk melakukan proses top up</p>
            <div className="pt-50">
                <label htmlFor="email" className="form-label text-lg fw-medium color-palette-1 mb-10">Email
                    Address</label>
                <input
                    type="email"
                    className="form-control rounded-pill text-lg"
                    id="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="pt-30">
                <label htmlFor="password"
                    className="form-label text-lg fw-medium color-palette-1 mb-10">Password</label>
                <input
                    type="password"
                    className="form-control rounded-pill text-lg"
                    id="password"
                    placeholder="Your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="button-group d-flex flex-column mx-auto pt-50">
                <button
                    type="button"
                    className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
                    role="button"
                    onClick={onSubmit}
                >
                    {loading ? "Loading..." : "Continue to Sign In"}
                </button>
                <Link href="/sign-up">
                    <a className="btn btn-sign-up fw-medium text-lg color-palette-1 rounded-pill">SignUp</a>
                </Link>
            </div>
        </div>
    )
}
