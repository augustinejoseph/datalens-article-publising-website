import "./SubscriptionPlans.css";
import {
  BACKEND_BASE_URL,
  fullLogo,
  premium,
  useNavigate,
  useState,
  AuthContext,
  useContext,
  ButtonLoading,
} from "../index";
import { loadStripe } from "@stripe/stripe-js";
const VITE_MONTHLY_PRICE_ID = import.meta.env.VITE_MONTHLY_PRICE_ID;
const VITE_ANNUAL_PRICE_ID = import.meta.env.VITE_ANNUAL_PRICE_ID;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const SubscriptionPlans = () => {
  const [annualLoading, setAnnualLoading] = useState(false)
  const [monthlyLoading, setMonthlyLoading] = useState(false)
  const { user } = useContext(AuthContext);
  const [stripeResponse, setStripeResponse] = useState(false);
  const [paymentUrlFromStripe, setPaymentUrlFromStripe] = useState("");
  const navigate = useNavigate();
  const tickIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/768px-Eo_circle_green_checkmark.svg.png?20200417132424"
  const handleSelectPlan = async (priceId) => {
    if (user) {
      try {
        if(priceId === VITE_MONTHLY_PRICE_ID){
          setMonthlyLoading(true)
        }else{
          setAnnualLoading(true)
        }
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
        setAnnualLoading(false)
        setMonthlyLoading(false)
      } catch (error) {
        setAnnualLoading(false)
        setMonthlyLoading(false)
      }
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
        <span> <img src={tickIcon} />Plans starting at less than Rs.20/week. </span>
        <span> <img src={tickIcon} /> Premium Badge. </span>
        <span> <img src={tickIcon} /> Cancel anytime. </span>
        <span> <img src={tickIcon} /> No ads </span>
        <span> <img src={tickIcon} /> Support quality writing </span>
        <span> <img src={tickIcon} />  Monetize your own Articles</span>
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
              {monthlyLoading ? <ButtonLoading /> : "Select"}
            </button>
          </div>
          <div className="plan_monthly">
            <div className="plan_m_title">Annual</div>
            <div className="plan_m_price">Rs. 500/year</div>
            <button
              onClick={() => handleSelectPlan(VITE_ANNUAL_PRICE_ID)}
              className="plan_m_button"
            >
            {annualLoading ? <ButtonLoading /> : "Select"}
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
