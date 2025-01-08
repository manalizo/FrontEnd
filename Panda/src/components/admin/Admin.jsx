import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css"; // You'll create this file for styling

const Admin = () => {
  return (
    <section className="panda-container mt-5">
      <div className="panda-header">
      
        <h2>Welcome to the Panda Admin Panel</h2>
      </div>
      <p className="panda-description">Manage your Products and Orders with panda power!</p>
      <hr className="panda-hr" />
      <div className="panda-links">
        <Link to={"/existing-products"} className="panda-button">Manage Products</Link>
        <Link to={"/existing-commandes"} className="panda-button">Manage Orders</Link>
      </div>
    </section>
  );
};

export default Admin;
