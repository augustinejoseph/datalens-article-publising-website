import "./Sidebar.css";
import {
  TrendingInSide,
  FeaturedArticles,
  SideAdvertisement,
  Footer,
} from "../../index";
const Sidebar = () => {
  return (
    <div>
      <TrendingInSide />
      <FeaturedArticles />
      <SideAdvertisement />
      <Footer />
    </div>
  );
};
export default Sidebar;
