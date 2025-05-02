import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImg from "../assets/login-img.jpg";

const Login = () => {
  const [form, setForm] = useState({ uhid: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8000/api/patient/login", form);

      // Store token and redirect
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("patient", JSON.stringify(response.data.patient));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert("Login failed. Please check your UHID and password.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row shadow-lg rounded-3 overflow-hidden">
        {/* Right Form Side */}
        <div className="col-md-6 bg-white p-5">
          <h2 className="mb-4 text-center">Welcome back 👋</h2>
          <p className="text-center">Please enter your UHID and password to log in!</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control loginInput"
                name="uhid"
                value={form.uhid}
                onChange={handleChange}
                placeholder="UHID (e.g. ABC123XYZ)"
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="password"
                className="form-control loginInput"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="rememberMe" />
                <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
              </div>
              <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 loginBtn"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Log In"}
            </button>

            <p className="text-center mt-4">
              Don’t have an account? <a href="/register"><strong>Sign up</strong></a>
            </p>
          </form>
        </div>

        {/* Left Image Side */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={loginImg}
            alt="Login"
            className="img-fluid h-100 w-100 loginImg"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
