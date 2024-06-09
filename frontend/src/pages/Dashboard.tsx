import { useState, useEffect } from "react";
import { userProfileView } from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the user profile data
    userProfileView()
      .then((response) => {
        setProfile(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Failed to load profile.</div>;
  }

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

export default Dashboard;
