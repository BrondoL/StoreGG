import OverviewContent from "../../components/organisms/OverviewContent/Index";
import Sidebar from "../../components/organisms/Sidebar/Index";

export default function Overview() {
    return (
        <section className="overview overflow-auto">
        <Sidebar activeMenu="overview" />
        <OverviewContent />
        </section>
    )
}
