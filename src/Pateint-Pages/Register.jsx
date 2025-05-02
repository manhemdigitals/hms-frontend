import { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login-img.jpg";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/patient/register", form);

      alert(`Registered successfully! Your UHID is ${res.data.uhid}`);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Please check your details or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row shadow-lg rounded-3 overflow-hidden">
        {/* Right Form Side */}
        <div className="col-md-6 bg-white p-5">
          <h2 className="mb-4 text-center">Create Your Account</h2>
          <p className="text-center">Register below to access your patient portal</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control loginInput"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="email"
                className="form-control loginInput"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control loginInput"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <input
                type="date"
                className="form-control loginInput"
                name="dob"
                value={form.dob}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <select
                className="form-control loginInput"
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <textarea
                className="form-control loginInput"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 loginBtn"
              disabled={loading}
            >
              {loading ? "Please wait..." : "Register"}
            </button>

            <p className="text-center mt-4">
              Already have an account? <a href="/login"><strong>Log In</strong></a>
            </p>
          </form>
        </div>

        {/* Left Image Side */}
        <div className="col-md-6 d-none d-md-block p-0">
          <img
            src={loginImg}
            alt="Register"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
