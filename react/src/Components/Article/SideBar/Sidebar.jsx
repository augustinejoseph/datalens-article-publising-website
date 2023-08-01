import "./Sidebar.css";
import {
  TrendingInSide,
  FeaturedArticles,
  SideAdvertisement,
  Footer,
  useContext,
  AuthContext,
} from "../../index";
const Sidebar = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <TrendingInSide />
      <FeaturedArticles />
      {!user?.is_premium &&
      <SideAdvertisement />
      }
      <Footer />
    </div>
  );
};
export default Sidebar;
