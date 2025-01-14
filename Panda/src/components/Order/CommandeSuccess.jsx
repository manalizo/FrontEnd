import React from "react"
import { Link, useLocation } from "react-router-dom"
import Header from "../common/Header"

const CommandeSuccess = () => {
	const location = useLocation()
	
	
	return (
		<div className="container">
			<Header title="Commande Success" />
			<div className="mt-5">
				
					<div>
						<h3 className="text-success">Commande Success!</h3>
					
					</div>
				
			</div>
		</div>
	)
}

export default CommandeSuccess
