import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
	return (
	
		<Col key={product.id} className="mb-4" xs={12}>
			<Card>
				<Card.Body className="d-flex flex-wrap align-items-center">
					<div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
						<Link to={`/book-room/${product.id}`}>
						
							<Card.Img
								variant="top"
								src={`data:image/png;base64, ${product.realimage}`}
								alt="Room Photo"
								style={{ width: "100%", maxWidth: "200px", height: "auto" }}
							/>
					
						</Link>
					</div>
					<div className="flex-grow-1 ml-3 px-5">
						<Card.Title className="hotel-color">{product.titre}</Card.Title>
						<Card.Title className="room-price">{product.prix} </Card.Title>
						<Card.Text>{product.description}</Card.Text>
					</div>
					<div className="flex-shrink-0 mt-3">
						<Link to={`/book-room/${product.id}`} className="btn btn-hotel btn-sm">
							Buy Now
						</Link>
					</div>
				</Card.Body>
			</Card>
		</Col>
	)
}

export default ProductCard