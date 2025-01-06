import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProducts } from "../utils/ApiFunctions";
import { Col, Row } from "react-bootstrap";
import RoomPaginator from "../common/RoomPaginator";
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExistingProducts = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const result = await getAllProducts();
      setProducts(result);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (productId) => {
    try {
      const result = await deleteProduct(productId);
      if (result === "") {
        setSuccessMessage(`Room No ${productId} was deleted`);
        fetchRooms();
      } else {
        console.error(`Error deleting room : ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = () => {
    return Math.ceil(products.length / productsPerPage);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
      <div className="container col-md-8 col-lg-6">
        {successMessage && (
          <p className="alert alert-success mt-5">{successMessage}</p>
        )}

        {errorMessage && (
          <p className="alert alert-danger mt-5">{errorMessage}</p>
        )}
      </div>

      {isLoading ? (
        <p>Loading existing Products</p>
      ) : (
        <>
          <section className="mt-5 mb-5 container">
            <div className="d-flex justify-content-between mb-3 mt-5">
              <h2>Existing Products</h2>
            </div>

            <Row>
              <Col md={6} className="d-flex justify-content-end">
                <Link to={"/add-product"}>
                  <FaPlus /> Add Product
                </Link>
              </Col>
            </Row>

            <table className="table table-bordered table-hover">
              <thead>
                <tr className="text-center">
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.map((product) => (
                  <tr key={product.id} className="text-center">
                    <td>{product.id}</td>
                    <td>{product.titre}</td>
                    <td>{product.prix}</td>
                    <td className="gap-2">
                      <Link to={`/edit-product/${product.id}`} className="gap-2">
                       
                        <span className="btn btn-warning btn-sm ml-2">
                          <FaEdit />
                        </span>
                      </Link >
                      <button
                        className="btn btn-danger btn-sm ml-2"
                        onClick={() => handleDelete(product.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages()}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    </>
  );
};

export default ExistingProducts;