import './Sidebar.css'
import TrendingInSide from './TrendingInSide';
import ReccomentedTopics from './ReccomentedTopics';
import SideAdvertisement from './SideAdvertisement';
import Footer from "./Footer"
const Sidebar = () => {
    return(
        <div>
        <TrendingInSide />
        <TrendingInSide />
        <ReccomentedTopics />
        <SideAdvertisement />
        <Footer />
        </div>
    )
}
export default Sidebar;