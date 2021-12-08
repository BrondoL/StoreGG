import { useRouter } from "next/router";
import { useState } from "react"
import { toast } from "react-toastify"
import { setCheckout } from "../../../services/player";

export default function CheckoutInformation() {
    const router = useRouter();

    const [checkbox, setCheckbox] = useState(false)
    const onSubmit = async () => {
        const dataItemLocal = JSON.parse(localStorage.getItem("data-item")!);
        const dataTopUpLocal = JSON.parse(localStorage.getItem("data-topup")!);

        if(!checkbox){
            toast.error("Pastikan anda telah melakukan pembayaran !!")
        }else{
            const data = {
                voucher: dataItemLocal._id,
                nominal: dataTopUpLocal.nominalItem._id,
                payment: dataTopUpLocal.paymentItem.payment._id,
                bank: dataTopUpLocal.paymentItem.bank._id,
                name: dataTopUpLocal.bankAccountName,
                accountUser: dataTopUpLocal.verifyID,
            }
            const response = await setCheckout(data);
            if(response.error){
                toast.error(response.message);
            }else{
                localStorage.removeItem('data-item');
                localStorage.removeItem('data-topup');
                router.push("/complete-checkout");
            }
        }

    }

    return (
        <div>
            <label className="checkbox-label text-lg color-palette-1">I have transferred the money
                <input type="checkbox" checked={checkbox} onChange={(e) => setCheckbox(!checkbox)} />
                <span className="checkmark"></span>
            </label>
            <div className="d-md-block d-flex flex-column w-100 pt-50">
                <button type="button" className="btn btn-confirm-payment rounded-pill fw-medium text-white border-0 text-lg"
                    role="button" onClick={onSubmit}>Confirm
                    Payment</button>
            </div>
        </div>
    )
}
