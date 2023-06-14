import './Sidebar.css'
import TrendingInSide from './TrendingInSide';
import ReccomentedTopics from '../Article/ReccomentedTopics';
import SideAdvertisement from '../Advertisements/SideAdvertisement';
import Footer from "../Footer/Footer"
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