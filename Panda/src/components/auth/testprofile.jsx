import React, { useEffect, useState } from "react";
import { deleteUser, getUserOrdersByEmail } from "../utils/ApiFunctions"; // Assuming you have a function to fetch orders by email
import { useAuth } from "../auth/AuthProvider"; // Import Auth context
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Profile = () => {
  const { user, handleLogout } = useAuth(); // Get user details from AuthContext
  const [orders, setOrders] = useState([]); // To store fetched orders
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingOrders, setLoadingOrders] = useState(true); // For tracking orders loading state
  const navigate = useNavigate();

  // Fetch orders based on email from AuthProvider only if user exists
  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.email) {
        try {
          // Fetch orders using the user's email (stored in AuthProvider)
          const ordersData = await getUserOrdersByEmail(user.email);
          setOrders(ordersData);
        } catch (error) {
          setErrorMessage("Error fetching orders.");
          console.error(error);
        } finally {
          setLoadingOrders(false); // Orders are loaded or failed
        }
      }
    };

    if (user && user.email) {
      fetchOrders();
    } else {
      setLoadingOrders(false); // No user means stop loading orders
    }
  }, [user]); // Re-run when user changes

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      await deleteUser(user.id)
        .then((response) => {
          setMessage(response.data);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userRole");
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
    }
  };

  return (
    <div className="container">
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {message && <p className="text-danger">{message}</p>}
      {user ? (
        <div className="card p-5 mt-5" style={{ backgroundColor: "whitesmoke" }}>
          <h4 className="card-title text-center">User Information</h4>
          <div className="card-body">
            <div className="col-md-10 mx-auto">
              <div className="card mb-3 shadow">
                <div className="row g-0">
                  <div className="col-md-2">
                    <div className="d-flex justify-content-center align-items-center mb-4">
                      <img
                        src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                        alt="Profile"
                        className="rounded-circle"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </div>
                  </div>

                  <div className="col-md-10">
                    <div className="card-body">
                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">ID:</label>
                        <div className="col-md-10">
                          <p className="card-text">{user.id}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">First Name:</label>
                        <div className="col-md-10">
                          <p className="card-text">{user.firstName}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">Last Name:</label>
                        <div className="col-md-10">
                          <p className="card-text">{user.lastName}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">Email:</label>
                        <div className="col-md-10">
                          <p className="card-text">{user.email}</p>
                        </div>
                      </div>
                      <hr />

                      <div className="form-group row">
                        <label className="col-md-2 col-form-label fw-bold">Roles:</label>
                        <div className="col-md-10">
                          <ul className="list-unstyled">
                            {user.roles.map((role) => (
                              <li key={role.id} className="card-text">
                                {role.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Commandes Section */}
              <div className="card mb-3 shadow">
                <h5 className="card-header">Your Orders</h5>
                <div className="card-body">
                  {loadingOrders ? (
                    <p>Loading your orders...</p>
                  ) : orders.length > 0 ? (
                    <ul className="list-group">
                      {orders.map((order) => (
                        <li key={order.id} className="list-group-item">
                          <div className="d-flex justify-content-between">
                            <span><strong>Product:</strong> {order.productName}</span>
                            <span><strong>Quantity:</strong> {order.quantity}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span><strong>Total:</strong> ${order.totalPrice}</span>
                            <span><strong>Order Date:</strong> {moment(order.date).format("MMM D, YYYY")}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No orders found.</p>
                  )}
                </div>
              </div>

              {/* Delete Account Button */}
              <div className="d-flex justify-content-center">
                <div className="mx-2">
                  <button className="btn btn-danger btn-sm" onClick={handleDeleteAccount}>
                    Close account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Profile;
