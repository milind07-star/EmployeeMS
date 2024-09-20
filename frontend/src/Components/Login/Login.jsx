import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const adminemail = "milind7@gmail.com";
const adminpassword = "12345";

const Login = ({ title, register }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (title === "Employee") {
        const res = await axios.post("http://localhost:8081/login", {
          email,
          password,
        });

        if (res.status === 200) {
          Swal.fire({
            title: "Employee login successfully!",
            text: res.data.message,
            icon: "success",
          });
          localStorage.setItem("email", res.data.user.email);
          navigate("/empdash");
          console.log(res);
        } else {
          Swal.fire({
            title: "Login failed",
            text: res.data.message || "An unexpected error occurred.",
            icon: "error",
          });
        }
      } else {
        if (email === adminemail && password === adminpassword) {
          Swal.fire({
            title: "Admin login successfully!",
            text: "Login Successful",
            icon: "success",
          });
          navigate("/dashboard");
        } else {
          Swal.fire({
            text: "Login failed",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Login failed",
        icon: "error",
      });
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>{title} Login</h1>
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-container" style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            name="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ paddingRight: "40px" }} // Add padding to make space for the icon
          />
          <span
            className="password-toggle-icon"
            onClick={() => setShowPassword(!showPassword)} // Toggle visibility state
            style={{
              position: "absolute",
              right: "35px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
            {/* Show appropriate icon */}
          </span>
        </div>

        <p style={{ textAlign: "right" }}>Forget Password</p>
        {register && (
          <div>
            <Link to="/register" className="register-link">
              Do not have an account? Register
            </Link>
          </div>
        )}
        <input type="submit" value={"Log In"} />
      </form>
    </div>
  );
};

export default Login;
