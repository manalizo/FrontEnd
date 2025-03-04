import React, { useEffect, useState } from "react"
import { getAllProducts, getProductImageById } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"

const Productarousel = () => {
	const [products, setProducts] = useState([]) // Changed to an empty array
	const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		const fetchProducts = async () => {
			try {
				// Fetch all products
				const productData = await getAllProducts()

				// Fetch the image for each product
				const productsWithImages = await Promise.all(
					productData.map(async (product) => {
						const image = await getProductImageById(product.id)
						return { ...product, realimage: image } // Add the image to the product
					})
				)

				setProducts(productsWithImages)
				setIsLoading(false)
			} catch (error) {
				setErrorMessage(error.message)
				setIsLoading(false)
			}
		}

		fetchProducts()
	}, [])

	if (isLoading) {
		return <div className="mt-5">Loading products....</div>
	}
	if (errorMessage) {
		return <div className="text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}

	return (
		<section className="bg-light mb-5 mt-5 shadow">
			<Link to={"/browse-all-products"} className="hote-color text-center">
				Browse all products
			</Link>

			<Container>
				<Carousel indicators={false}>
					{[...Array(Math.ceil(products.length / 4))].map((_, index) => (
						<Carousel.Item key={index}>
							<Row>
								{products.slice(index * 4, index * 4 + 4).map((product) => (
									<Col key={product.id} className="mb-4" xs={12} md={6} lg={3}>
										<Card>
											<Link to={`/commande-product/${product.id}`}>
												<Card.Img
													variant="top"
													src={`data:image/png;base64, ${product.realimage}`} // Use the realimage from the state
													alt="Product Photo"
													className="w-100"
													style={{ height: "200px", objectFit: "cover" }}
												/>
											</Link>
											<Card.Body>
												<Card.Title className="hotel-color">{product.titre}</Card.Title>
												<Card.Title className="room-price">${product.prix}</Card.Title>
												<div className="flex-shrink-0">
												<Link to={`/commande-product/${product.id}`} className="btn btn-hotel btn-sm">
																			Buy Now
																		</Link>
												</div>
											</Card.Body>
										</Card>
									</Col>
								))}
							</Row>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	)
}

export default Productarousel
