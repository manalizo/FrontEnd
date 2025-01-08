import CommandeForm from "./CommandeForm"
import React, { useEffect, useState } from "react"
import {
	FaBox,
	FaTruck,
	FaMoneyBillAlt,
	FaTshirt
} from "react-icons/fa"

import { useParams } from "react-router-dom"
import { getCommandeById } from "../utils/ApiFunctions"
import ProductCarousel from "../common/ProductCarousel"
import {getProductById} from "../utils/ApiFunctions"
const Checkout = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [productInfo, setProductInfo] = useState({
		image: "",
		titre: "",
		prix: "",
		description: "",
	})

	const { productId } = useParams()

	useEffect(() => {
		setTimeout(() => {
			getProductById(productId)
				.then((response) => {
					setProductInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [productId])

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
									src={`data:image/png;base64,${productInfo.image}`}
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
						<CommandeForm />
					</div>
				</div>
			</section>
			<div className="container">
				  <ProductCarousel/> 
			
			</div>
		</div>
	)
}
export default Checkout
