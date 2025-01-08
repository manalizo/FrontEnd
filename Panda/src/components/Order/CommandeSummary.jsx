import React, { useState, useEffect } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const CommandeSummary = ({ commande, payment, isFormValid, onConfirm }) => {
	const [isCommandeConfirmed, setIsCommandeConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

	const handleConfirmCommande = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsCommandeConfirmed(true)
			onConfirm()
		}, 3000)
	}

	useEffect(() => {
		if (isCommandeConfirmed) {
			navigate("/commande-success") // Redirect to a success page for the order
		}
	}, [isCommandeConfirmed, navigate])

	return (
		<div className="row">
			<div className="col-md-6"></div>
			<div className="card card-body mt-5">
				<h4 className="card-title">Commande Summary</h4>
				<p>
					Product Description: <strong>{commande.description}</strong>
				</p>
				<p>
					Quantity: <strong>{commande.quantite}</strong>
				</p>
				<p>
					Date: <strong>{moment(commande.date).format("MMM Do YYYY")}</strong>
				</p>
				<p>
					Total payment: <strong>${payment}</strong>
				</p>

				{payment > 0 ? (
					<>
						{isFormValid && !isCommandeConfirmed ? (
							<Button variant="success" onClick={handleConfirmCommande}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Commande Confirmed, redirecting to payment...
									</>
								) : (
									"Confirm Commande & proceed to payment"
								)}
							</Button>
						) : isCommandeConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
					</>
				) : (
					<p className="text-danger">Please check the order details.</p>
				)}
			</div>
		</div>
	)
}

export default CommandeSummary
