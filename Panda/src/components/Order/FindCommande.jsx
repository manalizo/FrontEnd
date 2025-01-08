import React, { useState } from "react"
import { deleteCommande, getCommandeById } from "../utils/ApiFunctions" // Assuming cancelCommande and getCommandeById are available
import moment from "moment"

const FindCommande = () => {
	const [commandeId, setCommandeId] = useState("")
	const [error, setError] = useState(null)
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [commandeInfo, setCommandeInfo] = useState({
		id: "",
		commandeId: "",
		product: { id: "", productName: "", price: "" },
		quantity: "",
		guestName: "",
		guestEmail: "",
		totalAmount: ""
	})

	const emptyCommandeInfo = {
		id: "",
		commandeId: "",
		product: { id: "", productName: "", price: "" },
		quantity: "",
		guestName: "",
		guestEmail: "",
		totalAmount: ""
	}
	const [isDeleted, setIsDeleted] = useState(false)

	const handleInputChange = (event) => {
		setCommandeId(event.target.value)
	}

	const handleFormSubmit = async (event) => {
		event.preventDefault()
		setIsLoading(true)

		try {
			const data = await getCommandeById(commandeId)
			setCommandeInfo(data)
			setError(null)
		} catch (error) {
			setCommandeInfo(emptyCommandeInfo)
			if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} else {
				setError(error.message)
			}
		}

		setTimeout(() => setIsLoading(false), 2000)
	}

	const handleCommandeCancellation = async (commandeId) => {
		try {
			await deleteCommande(commandeId)
			setIsDeleted(true)
			setSuccessMessage("Commande has been cancelled successfully!")
			setCommandeInfo(emptyCommandeInfo)
			setCommandeId("")
			setError(null)
		} catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
	}

	return (
		<>
			<div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
				<h2 className="text-center mb-4">Find My Commande</h2>
				<form onSubmit={handleFormSubmit} className="col-md-6">
					<div className="input-group mb-3">
						<input
							className="form-control"
							type="text"
							id="commandeId"
							name="commandeId"
							value={commandeId}
							onChange={handleInputChange}
							placeholder="Enter the commande ID"
						/>

						<button type="submit" className="btn btn-hotel input-group-text">
							Find Commande
						</button>
					</div>
				</form>

				{isLoading ? (
					<div>Finding your commande...</div>
				) : error ? (
					<div className="text-danger">Error: {error}</div>
				) : commandeInfo.commandeId ? (
					<div className="col-md-6 mt-4 mb-5">
						<h3>Commande Information</h3>
						<p className="text-success">Commande ID: {commandeInfo.commandeId}</p>
						<p>Product Name: {commandeInfo.product.productName}</p>
						<p>Price per unit: ${commandeInfo.product.price}</p>
						<p>Quantity: {commandeInfo.quantity}</p>
						<p>Total Amount: ${commandeInfo.totalAmount}</p>
						<p>Full Name: {commandeInfo.guestName}</p>
						<p>Email Address: {commandeInfo.guestEmail}</p>

						{!isDeleted && (
							<button
								onClick={() => handleCommandeCancellation(commandeInfo.id)}
								className="btn btn-danger">
								Cancel Commande
							</button>
						)}
					</div>
				) : (
					<div>find commande...</div>
				)}

				{isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
			</div>
		</>
	)
}

export default FindCommande
