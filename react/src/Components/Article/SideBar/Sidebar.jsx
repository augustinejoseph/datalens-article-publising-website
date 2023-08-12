import "./Sidebar.css";
import {
  TrendingInSide,
  FeaturedArticles,
  Footer,
  useContext,
  AuthContext,
  AdsComponent,
} from "../../index";
const Sidebar = () => {
  const {user} = useContext(AuthContext)
  return (
    <div>
      <TrendingInSide />
      <FeaturedArticles />
      {!user?.is_premium &&
      <AdsComponent dataAdSlot='1183482594' />
      }
      <Footer />
    </div>
  );
};
export default Sidebar;
