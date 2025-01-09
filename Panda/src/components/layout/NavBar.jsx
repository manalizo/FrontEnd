import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AuthContext } from '../auth/AuthContext'; // Assurez-vous que ce chemin est correct

function NavBar() {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Appelle la fonction de déconnexion depuis le contexte d'authentification
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
              {user ? (
                <>
                  <NavDropdown.Item href="/admin">Admin</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                </>
              )}
            </NavDropdown>

            {user && <Nav.Link>Welcome, {user.username}</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;