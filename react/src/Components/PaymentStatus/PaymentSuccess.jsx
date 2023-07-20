import "./PaymentSuccess.css";

import { React, TokenRefresh, useNavigate } from "../index";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const navigatePremium = async () => {
    await TokenRefresh();
    navigate("/premium");
    window.location.reload();
  };

  return (
    <div className="payment_container">
      <div className="payment_title">
        <span>Payment Successful</span>
      </div>
      <div className="payment_image_success">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </div>
      <div className="payment_description">
        <span>Your payment is successful. </span>
        <span>Enjoy Unlimited Premium articles </span>
      </div>
      <div className="payment_home_link">
        <button onClick={navigatePremium}>
          Start Reading Premium Articles
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
