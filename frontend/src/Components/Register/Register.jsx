import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState({});
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (password !== confirm_password) {
        setErrorMsg({ confirmPassword: "Passwords do not match" });
        return;
      }
    const user = {
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/register",
        user
      );
      if (data.success) {
        setSuccessMsg(data.message);
      } else {
        setErrorMsg(data.errors);
      }
    } catch (error) {
      console.error("Error: ", error);
      setErrorMsg({ general: "An error occurred. Please try again." });
    }
  };

  return (
    <div className="login_container">
      <div className="Auth-form-container d-flex justify-content-center align-items-center">
        <form className="Auth-form" onSubmit={submit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Register</h3>
            {successMsg && <div className="success-message">{successMsg}</div>}
            {errorMsg.general && <div className="error-message">{errorMsg.general}</div>}
            <div className="form-group mt-3">
              <label>First Name</label>
              <input
                className="form-control mt-1"
                placeholder="First Name"
                name="first_name"
                type="text"
                value={first_name}
                required
                onChange={(e) => setFirst_name(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Last Name</label>
              <input
                name="last_name"
                type="text"
                className="form-control mt-1"
                placeholder="Enter last name"
                value={last_name}
                required
                onChange={(e) => setLast_name(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Confirm Password</label>
              <input
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={confirm_password}
                required
                onChange={(e) => setConfirm_password(e.target.value)}
              />
            </div>
            {errorMsg.confirmPassword && (
                <div className="error-message">{errorMsg.confirmPassword}</div>
              )}
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
