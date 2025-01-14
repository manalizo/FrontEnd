import React from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../auth/AuthProvider"; // To check if the user is logged in

const MainHeader = () => {
  const { user } = useAuth();

  return (
    <Container fluid>
      <Row>
        <header className="header-banner">
          <div className="animated-texts overlay-content">
            <h1>
              Welcome to <span className="hotel-color">Panda</span>
            </h1>
            {user && <p>Welcome back, {user.sub}!</p>} {/* Optionally show user name or ID */}
          </div>
        </header>
      </Row>
    </Container>
  );
};

export default MainHeader;
