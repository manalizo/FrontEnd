import React from "react";
import { useAuth } from "../auth/AuthProvider"; // Import Auth context
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // For navigation after logout

const NavBar = () => {
  const { user, handleLogout } = useAuth(); // Access authentication state
  const navigate = useNavigate();

  // Logout function
  const logout = () => {
    handleLogout(); // Call the logout function from context
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Panda</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/browse-all-products">Products</Nav.Link>

            <NavDropdown title="Account" id="basic-nav-dropdown">
              {/* If user is authenticated, show account options */}
              {user ? (
                <>
                  {/* Show Profile if user is logged in */}
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>

                  {/* Show Admin if user has ADMIN role */}
                  {user.roles.includes("ADMIN") && (
                    <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                  )}

                  {/* Logout option */}
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  {/* If not authenticated, show login/register options */}
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
