import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [newAge, setNewAge] = useState("");

  const loadProfile = async () => {
    try {
      const res = await API.get("/profile");
      setProfile(res.data);
    } catch (err) {
      navigate("/");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const updateAge = async () => {
    try {
      await API.put("/profile", {
        age: newAge,
      });

      loadProfile();
      setNewAge("");
    } catch (err) {
      alert("Update Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!profile) {
    return <h2>Loading...</h2>;
  }

  const status =
    profile.age > 12 ? "UR GOOD ✅" : "UR BAD ❌";

  return (
    <div>
      <h1>{status}</h1>

      <h2>{profile.full_name}</h2>

      <h3>Age: {profile.age}</h3>

      <br />

      <input
        type="number"
        placeholder="Update Age"
        value={newAge}
        onChange={(e) => setNewAge(e.target.value)}
      />

      <button onClick={updateAge}>
        Update Age
      </button>

      <br /><br />

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;