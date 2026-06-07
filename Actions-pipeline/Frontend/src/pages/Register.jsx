import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await API.post("/register", {
        username,
        password,
      });

      alert("Registration Successful");
      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={register}>Register</button>

      <p>
        Already Registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;