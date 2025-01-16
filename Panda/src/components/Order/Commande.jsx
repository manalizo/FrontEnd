import React, { useEffect, useState } from "react";
import { FaBox, FaTruck, FaMoneyBillAlt, FaTshirt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getProductById, getProductImageById } from "../utils/ApiFunctions";

const Commande = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [productInfo, setProductInfo] = useState({
    image: "",
    titre: "",
    prix: "",
    description: "",
  });
  const { productId } = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // Fetch product information
        const productResponse = await getProductById(productId);

        // Fetch product image
        const productImage = await getProductImageById(productId);

        // Update state with product info and image
        setProductInfo({
          ...productResponse,
          image: productImage,
        });
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    // Call the function to fetch data
    fetchProductData();
  }, [productId]);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <section className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 mt-5 mb-5">
            {isLoading ? (
              <p>Loading order information...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <div className="room-info">
          <img
  src={`data:image/png;base64,${productInfo.image}`} // Display the image after it's fetched
  alt="Product photo"
  className="img-fluid rounded" // Use Bootstrap classes for responsiveness
  style={{ objectFit: "cover", width: "100%", maxHeight: "300px" }} // Maintain aspect ratio
/>

                <table className="table table-bordered mt-3">
                  <tbody>
                    <tr>
                      <th>Product Name:</th>
                      <td>{productInfo.titre}</td>
                    </tr>
                    <tr>
                      <th>Price per unit:</th>
                      <td>${productInfo.prix}</td>
                    </tr>
                    <tr>
                      <th>Description:</th>
                      <td>{productInfo.description}</td>
                    </tr>
                    <tr>
                      <th>Shipping Info:</th>
                      <td>
                        <ul className="list-unstyled">
                          <li>
                            <FaTruck /> Free Shipping
                          </li>
                          <li>
                            <FaMoneyBillAlt /> Cash on Delivery
                          </li>
                          <li>
                            <FaTshirt /> Gift Wrapping Available
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Commande;
