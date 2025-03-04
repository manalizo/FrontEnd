import React, { useEffect, useState } from "react";
import { FaBox, FaTruck, FaMoneyBillAlt, FaTshirt } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getProductImageById } from "../utils/ApiFunctions";
import CommandeForm from "./CommandeForm";
import ProductCarousel from "../common/ProductCarousel";
import { useAuth } from "../auth/AuthProvider"; // Assuming you have an AuthContext

const Checkout = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [productInfo, setProductInfo] = useState({
		image: "",
		titre: "",
		prix: "",
		description: "",
	});
	const { productId } = useParams();
	const { user } = useAuth(); // Get user data from AuthContext
	const navigate = useNavigate(); // Navigate hook to redirect

	useEffect(() => {
		// Check if the user is authenticated
		if (!user) {
			navigate("/login"); // Redirect to login page if user is not authenticated
			return;
		}

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
	}, [productId, user, navigate]); // Include user in the dependencies

	return (
		<div>
			<section className="container">
				<div className="row">
					<div className="col-md-4 mt-5 mb-5">
						{isLoading ? (
							<p>Loading order information...</p>
						) : error ? (
							<p>{error}</p>
						) : (
							<div className="room-info">
								<img
									src={`data:image/png;base64,${productInfo.image}`} // Display the image after it's fetched
									alt="Product photo"
									style={{ width: "100%", height: "200px" }}
								/>
								<table className="table table-bordered">
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
					<div className="col-md-8">
						{user && <CommandeForm />} {/* Show the CommandeForm only if user is authenticated */}
					</div>
				</div>
			</section>
			<div className="container">
				<ProductCarousel />
			</div>
		</div>
	);
};

export default Checkout;
