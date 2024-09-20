import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8081/register_employee", {
        username,
        email,
        phone,
        password,
      });

      if (res.status === 200) {
        Swal.fire({
          title: "Good job!",
          text: "Register Successful",
          icon: "success",
        });
        navigate("/employee");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Swal.fire({
          title: "Error",
          text: error.response.data,
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "An unexpected error occurred. Please try again later.",
          icon: "error",
        });
      }
    }
    setUsername("");
    setEmail("");
    setPhone("");
    setPassword("");
  };

  return (
    <div>
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="input"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="submit"
            value="Register"
            style={{
              background:
                "linear-gradient(89deg, rgb(21, 74, 189) 0.1%, rgb(26, 138, 211) 51.5%, rgb(72, 177, 234) 100.2%)",
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
