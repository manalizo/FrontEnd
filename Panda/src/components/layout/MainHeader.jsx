import React from "react"
import { Container, Row } from "react-bootstrap"

const MainHeader = () => {
    return (
        <Container fluid>
            <Row>
                <header className="header-banner">
                   
                    <div className="animated-texts overlay-content">
                        <h1>
                            Welcome to <span className="hotel-color">Panda</span>
                        </h1>

                    </div>
                </header>
            </Row>
        </Container>
    )
}

export default MainHeader
