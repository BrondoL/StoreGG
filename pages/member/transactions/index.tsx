import Sidebar from "../../../components/organisms/Sidebar/Index";
import TransactionContent from "../../../components/organisms/TransactionContent/Index";

export default function Transactions() {
    return (
        <section className="transactions overflow-auto">
        <Sidebar activeMenu="transactions" />
        <TransactionContent />
    </section>
    )
}
