import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css"; // You'll create this file for styling

const Admin = () => {
  return (
    <section className="panda-container mt-5">
      <div className="panda-header">
      
        <h2>Welcome to the Panda Admin Panel</h2>
      </div>
      <p className="panda-description">Manage your rooms and bookings with panda power!</p>
      <hr className="panda-hr" />
      <div className="panda-links">
        <Link to={"/existing-rooms"} className="panda-button">Manage Rooms</Link>
        <Link to={"/existing-bookings"} className="panda-button">Manage Bookings</Link>
      </div>
    </section>
  );
};

export default Admin;
