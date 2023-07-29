import "./SubscriptionPlans.css";
import {
  BACKEND_BASE_URL,
  fullLogo,
  premium,
  useNavigate,
  useState,
  AuthContext,
  useContext,
} from "../index";
import { loadStripe } from "@stripe/stripe-js";
const VITE_MONTHLY_PRICE_ID = import.meta.env.VITE_MONTHLY_PRICE_ID;
const VITE_ANNUAL_PRICE_ID = import.meta.env.VITE_ANNUAL_PRICE_ID;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const SubscriptionPlans = () => {
  const { user } = useContext(AuthContext);
  const [stripeResponse, setStripeResponse] = useState(false);
  const [paymentUrlFromStripe, setPaymentUrlFromStripe] = useState("");
  const navigate = useNavigate();

  const handleSelectPlan = async (priceId) => {
    if (user) {
      try {
        const stripe = await stripePromise;

        const response = await fetch(
          `${BACKEND_BASE_URL}/payments/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ priceId, userId: user?.user_id }),
          },
        );

        const session = await response.json();
        if (session) {
          setPaymentUrlFromStripe(session);
          setStripeResponse(true);
        }
      } catch (error) {}
    } else navigate("/login");
  };

  const handlePayment = () => {
    window.open(paymentUrlFromStripe, "_self");
  };

  return (
    <div className="plan_container">
      <div className="plan_logo">
        <img onClick={() => navigate("/")} src={fullLogo} />
      </div>
      <div className="plan_heading">
        <span>Get unlimited access to everything on DataLens</span>
      </div>
      <div className="plan_description">
        <span>Plans starting at less than Rs.20/week. </span>
        <span>Premium Badge. </span>
        <span>Cancel anytime. </span>
        <span>No ads </span>
        <span>Listen to any story </span>
        <span>Support quality writing </span>
        <span>Access on any device </span>
        <span> Create your own Articles</span>
      </div>
      {!stripeResponse && (
        <div className="plan_plans">
          <div className="plan_monthly">
            <div className="plan_m_title">Monthly</div>
            <div className="plan_m_price">Rs. 50/month</div>
            <button
              onClick={() => handleSelectPlan(VITE_MONTHLY_PRICE_ID)}
              className="plan_m_button"
            >
              Select
            </button>
          </div>
          <div className="plan_monthly">
            <div className="plan_m_title">Annual</div>
            <div className="plan_m_price">Rs. 500/year</div>
            <button
              onClick={() => handleSelectPlan(VITE_ANNUAL_PRICE_ID)}
              className="plan_m_button"
            >
              Select
            </button>
          </div>
        </div>
      )}
      {stripeResponse && (
        <div className="plan_pay_button_container">
          <button onClick={handlePayment} className="plan_pay_button">
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPlans;
