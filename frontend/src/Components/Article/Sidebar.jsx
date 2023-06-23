import './Sidebar.css'
import TrendingInSide from './TrendingInSide';
import FeaturedArticles from './FeaturedArticles';
import SideAdvertisement from '../Advertisements/SideAdvertisement';
import Footer from "../Footer/Footer"
const Sidebar = () => {
    return(
        <div>
        <TrendingInSide />
        <TrendingInSide />
        <FeaturedArticles />
        <SideAdvertisement />
        <Footer />
        </div>
    )
}
export default Sidebar;