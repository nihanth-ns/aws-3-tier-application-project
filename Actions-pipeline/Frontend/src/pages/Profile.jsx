import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Profile() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");

  const submitProfile = async () => {
    try {
      await API.post("/profile", {
        full_name: fullName,
        age,
      });

      navigate("/dashboard");
    } catch (err) {
      alert("Failed");
    }
  };

  return (
    <div>
      <h1>Profile Details</h1>

      <input
        placeholder="Full Name"
        onChange={(e) => setFullName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Age"
        onChange={(e) => setAge(e.target.value)}
      />

      <br /><br />

      <button onClick={submitProfile}>
        Submit
      </button>
    </div>
  );
}

export default Profile;