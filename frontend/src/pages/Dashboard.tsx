import { useState, useEffect } from "react";
import { userProfileView } from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [profile, setProfile] = useState<any | null>(null);

  useEffect(() => {
    // Fetch the user profile data
    userProfileView()
      .then((data) => {
        setProfile(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);
  
  if (profile) {
    return (
      <>
        <Navbar profile={profile.username}/>
        <div>
          <h1>Welcome, {profile.username}!</h1>
          <p>Email: {profile.email}</p>
          <p>Department: {profile.department}</p>
          <p>Role: {profile.role}</p>
        </div>
      </>
    );
  }
}

export default Dashboard;
