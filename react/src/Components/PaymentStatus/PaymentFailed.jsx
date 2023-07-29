import "./PaymentSuccess.css";

import { React, useNavigate } from "../index";

const PaymentFailed = () => {
  const navigate = useNavigate();
  return (
    <div className="payment_container">
      <div className="payment_title">
        <span>Payment Failed</span>
      </div>
      <div className="payment_image_failed">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </div>
      <div className="payment_description">
        <span>payment failed. </span>
        <span>Retry again. </span>
        <span>If any amount is debited, contact us for refund. </span>
      </div>
      <div className="payment_home_link">
        <button onClick={() => navigate("/plans")}>Retry Payment</button>
      </div>
    </div>
  );
};

export default PaymentFailed;
