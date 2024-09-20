import axios from "axios";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          throw new Error("Email not found in localStorage");
        }

        console.log("Fetching profile for email:", email); // Log the email
        const response = await axios.get(
          `http://localhost:8081/profile?email=${email}`
        );
        console.log("API Response:", response.data); // Log API response

        if (response.data.Status) {
          setProfile(response.data.Result);
        } else {
          setError(response.data.Error);
        }
      } catch (err) {
        console.error("Fetch profile error:", err.message); // Log the error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>No profile data available</div>;
  // if (!profile) return <div>No profile data available</div>;

  return (
    <div
      className="status-grid"
      style={{
        display: "flex",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        padding: "20px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="status-card"
        style={{
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
          position: "relative",
          borderRight: "5px solid #031658",
          borderLeft: "5px solid #031658",
          margin: "auto",
        }}
      >
        <div
          className="card-header"
          style={{
            color: "black",
            padding: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "25px",
            borderBottom: "1px solid #031658",
          }}
        >
          Profile
        </div>
        <div
          className="profile-image"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "10px",
          }}
        >
          <img
            src={
              profile.image.includes("uploads")
                ? `http://localhost:8081${profile.image}` // If profile.image already includes 'uploads'
                : `http://localhost:8081/uploads/${profile.image}`
            } // Replace with your image source
            alt="Profile"
            style={{
              width: "170px",
              height: "200px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div
          className="card-body"
          style={{
            padding: "15px",
            color: "#333",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          <p style={{ margin: "10px 0" }}>
            <strong>Name:</strong> {profile.name}
          </p>
          <p style={{ margin: "10px 0" }}>
            <strong>Email:</strong> {profile.email}
          </p>
          <p style={{ margin: "10px 0" }}>
            <strong>Contact:</strong> {profile.contact}
          </p>
          <p style={{ margin: "10px 0" }}>
            <strong>Salary:</strong> {profile.salary}
          </p>
          <p style={{ margin: "10px 0" }}>
            <strong>Address:</strong> {profile.address}
          </p>
        </div>

        <div
          className="card-footer"
          style={{
            padding: "10px",
            textAlign: "center",
            fontSize: "12px",
            color: "#777",
            position: "absolute",
            bottom: "0",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* Optional footer content */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
