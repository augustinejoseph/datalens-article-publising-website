import "./SubscriptionPlans.css";
import { fullLogo, premium, useNavigate } from "../index";

const SubscriptionPlans = () => {
  const navigate = useNavigate()
  return (
    <div className="plan_container">
      <div className="plan_logo">
        <img onClick={() => navigate("/")} src={fullLogo} />
      </div>
      <div className="plan_heading">
        <span>
        Get unlimited access to everything on DataLens
        </span>
      </div>
      <div className="plan_description">
        <span >Plans starting at less than Rs.20/week. </span>
        <span >Premium Badge. </span>
        <span >Cancel anytime. </span>
        <span >No ads </span>
        <span >Listen to any story </span>
        <span >Support quality writing </span>
        <span >Access on any device </span>
        <span > Create your own Articles</span>
      </div>
      <div className="plan_plans">
        <div className="plan_monthly">
          <div className="plan_m_title">Monthly</div>
          <div className="plan_m_price">Rs. 50/month</div>
          <button className="plan_m_button">Select</button>
        </div>
        <div className="plan_monthly">
          <div className="plan_m_title">Annual</div>
          <div className="plan_m_price">Rs. 500/year</div>
          <button className="plan_m_button">Select</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
