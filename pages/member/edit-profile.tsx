import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/atoms/Input/Index";
import Sidebar from "../../components/organisms/Sidebar/Index";
import { JWTPayloadTypes } from "../../services/data-types";
import { updateProfile } from "../../services/member";

interface UserStateTypes {
    name: string;
    email: string;
    avatar: any;
    phoneNumber: string;
}

export default function EditProfile() {
    const [user, setUser] = useState<UserStateTypes>({
        avatar: '',
        name: '',
        email: '',
        phoneNumber: '',
    })
    const [imagePreview, setImagePreview] = useState('/');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if(token){
            const jwtToken = atob(token!);
            const payload : JWTPayloadTypes = jwtDecode(jwtToken);
            const userFromPayload = payload.player;
            const IMG = process.env.NEXT_PUBLIC_IMG;
            userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;
            setUser(userFromPayload);
        }
    }, [])

    const onSubmit = async () => {
        setLoading(true);

        const data = new FormData();
        data.append("image", user.avatar);
        data.append("name", user.name);
        data.append("phoneNumber", user.phoneNumber)

        const response = await updateProfile(data);
        if(response.error){
            toast.error(response.message);
        }else{
            Cookies.remove("token");
            router.push("/sign-in");
        }
        setLoading(false);
    }

    return (
        <section className="edit-profile overflow-auto">
        <Sidebar activeMenu="settings" />
        <main className="main-wrapper">
            <div className="ps-lg-0">
                <h2 className="text-4xl fw-bold color-palette-1 mb-30">Settings</h2>
                <div className="bg-card pt-30 ps-30 pe-30 pb-30">
                    <form action="">
                        <div className="photo d-flex">
                            <div className="image-upload">
                                <label htmlFor="avatar">
                                    {imagePreview !== '/' ? (
                                        <img src={imagePreview} alt="avatar" width={90} height={90} style={{ borderRadius: '100%' }} />
                                    ) : (
                                        <img src={user.avatar} alt="avatar" width={90} height={90} style={{ borderRadius: '100%' }} />
                                    )}
                                </label>
                                <input
                                    id="avatar"
                                    type="file"
                                    name="avatar"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => {
                                        const img = e.target.files![0];
                                        setImagePreview(URL.createObjectURL(img));
                                        return setUser({
                                            ...user,
                                            avatar: img
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="pt-30">
                            <Input
                                label="Full Name"
                                value={user.name}
                                onChange={(e) => setUser({
                                    ...user,
                                    name: e.target.value
                                })}
                            />
                        </div>
                        <div className="pt-30">
                            <Input label="Email Address" value={user.email} disabled />
                        </div>
                        <div className="pt-30">
                            <Input
                                label="Phone"
                                value={user.phoneNumber}
                                onChange={(e) => setUser({
                                    ...user,
                                    phoneNumber: e.target.value
                                })}
                            />
                        </div>
                        <div className="button-group d-flex flex-column pt-50">
                            {loading ? (
                                <button
                                    type="button"
                                    className="btn btn-save fw-medium text-lg text-white rounded-pill"
                                >Loading...
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-save fw-medium text-lg text-white rounded-pill"
                                    onClick={onSubmit}
                                >Save My Profile
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </section>
    )
}
