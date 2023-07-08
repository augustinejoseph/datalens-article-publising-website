import "./SubscriptionPlans.css";
import { BACKEND_BASE_URL, fullLogo, premium, useNavigate } from "../index";
import { loadStripe } from '@stripe/stripe-js';
const VITE_MONTHLY_PRICE_ID = (import.meta.env.VITE_MONTHLY_PRICE_ID);
const VITE_ANNUAL_PRICE_ID = (import.meta.env.VITE_ANNUAL_PRICE_ID);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
console.log("striope promis ", stripePromise);
const SubscriptionPlans = () => {
  
  const navigate = useNavigate()

  



  const handleSelectPlan = async (priceId) => {
    try {
      const stripe = await stripePromise;
      
      const response = await fetch(`${BACKEND_BASE_URL}payments/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      });
      
      const session = await response.json();
      console.log('session id from stripe', session.id);
      if (session.id) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: session.id,
        });
  
        if (error) {
          console.log("Stripe redirect error: 2222", error);
        }
      }
    } catch (error) {
      console.log("Error: 1111", error);
    }
  };



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
          <button onClick={() => handleSelectPlan(VITE_MONTHLY_PRICE_ID)} className="plan_m_button">Select</button>
        </div>
        <div className="plan_monthly">
          <div className="plan_m_title">Annual</div>
          <div className="plan_m_price">Rs. 500/year</div>
          <button onClick={() => handleSelectPlan(VITE_ANNUAL_PRICE_ID)} className="plan_m_button">Select</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
