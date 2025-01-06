import React, { useEffect, useState } from "react"
import { getAllProducts } from "../utils/ApiFunctions"
import { getProductImageById } from "../utils/ApiFunctions" // Assuming you have this function
import ProductCard from "./ProductCard"
import { Col, Container, Row } from "react-bootstrap"
import RoomPaginator from "../common/RoomPaginator"

const Product = () => {
  const [data, setData] = useState([]) // Array to hold product data and images
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [productPerPage] = useState(6)

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true)

      try {
        const products = await getAllProducts()

        // Fetch image for each product
        const productsWithImages = await Promise.all(
          products.map(async (product) => {
            const realimage = await getProductImageById(product.id) // Fetch image for each product
            return { ...product, realimage } // Add the image to the product object
          })
        )

        setData(productsWithImages) // Save processed products with image in state
        setIsLoading(false)
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (isLoading) {
    return <div>Loading products.....</div>
  }

  if (error) {
    return <div className="text-danger">Error: {error}</div>
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(data.length / productPerPage)

  const renderProducts = () => {
    const startIndex = (currentPage - 1) * productPerPage
    const endIndex = startIndex + productPerPage
    return data
      .slice(startIndex, endIndex)
      .map((product) => <ProductCard key={product.id} product={product} />) // Pass product here, not productsWithImages
  }

  return (
    <Container>
      <Row>{renderProducts()}</Row>

      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Product
