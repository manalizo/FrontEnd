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
import Productarousel from "../common/ProductCarousel"

const CommandeCheckout = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [commandeInfo, setCommandeInfo] = useState({
		image: "",
		productName: "",
		productPrice: "",
		quantity: "",
	})

	const { commandeId } = useParams()

	useEffect(() => {
		setTimeout(() => {
			getCommandeById(commandeId)
				.then((response) => {
					setCommandeInfo(response)
					setIsLoading(false)
				})
				.catch((error) => {
					setError(error)
					setIsLoading(false)
				})
		}, 1000)
	}, [commandeId])

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
							<div className="commande-info">
								<img
									src={`data:image/png;base64,${commandeInfo.image}`}
									alt="Product photo"
									style={{ width: "100%", height: "200px" }}
								/>
								<table className="table table-bordered">
									<tbody>
										<tr>
											<th>Product Name:</th>
											<td>{commandeInfo.productName}</td>
										</tr>
										<tr>
											<th>Price per unit:</th>
											<td>${commandeInfo.productPrice}</td>
										</tr>
										<tr>
											<th>Quantity:</th>
											<td>{commandeInfo.quantity}</td>
										</tr>
										<tr>
											<th>Total:</th>
											<td>${commandeInfo.productPrice * commandeInfo.quantity}</td>
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
				 {/* <Productarousel/> */}
			
			</div>
		</div>
	)
}
export default CommandeCheckout
