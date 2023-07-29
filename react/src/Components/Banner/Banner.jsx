import "./Banner.css";
import { useNavigate } from "../index";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="banner_container">
      <div className="banner_title">
        <span>Welcome to DataLens</span>
      </div>
      <div className="banner_description">
        <span>
          Datalens is a Article publishing website where any users can publish
          an article on anything and anybody can read the articles for free.
        </span>
      </div>
      <div className="banner_links">
        <button onClick={() => navigate("/register")}>SignUp</button>
        <button onClick={() => navigate("/plans")}>Plans</button>
      </div>
    </div>
  );
};

export default Banner;
