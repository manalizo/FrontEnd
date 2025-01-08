import { parseISO } from "date-fns";
import React, { useState, useEffect } from "react";
import DateSlider from "../common/DateSlider";  // Assuming DateSlider remains the same

const CommandesTable = ({ commandeInfo, handleCommandeCancellation }) => {
	const [filteredCommandes, setFilteredCommandes] = useState(commandeInfo);

	// Filter commandes based on the selected dates
	const filterCommandes = (startDate, endDate) => {
		let filtered = commandeInfo;
		if (startDate && endDate) {
			filtered = commandeInfo.filter((commande) => {
				const commandeDate = parseISO(commande.date);
				return (
					commandeDate >= startDate &&
					commandeDate <= endDate &&
					commandeDate > startDate
				);
			});
		}
		setFilteredCommandes(filtered);
	};

	useEffect(() => {
		setFilteredCommandes(commandeInfo);
	}, [commandeInfo]);

	return (
		<section className="p-4">
			<DateSlider onDateChange={filterCommandes} onFilterChange={filterCommandes} />
			<table className="table table-bordered table-hover shadow">
				<thead>
					<tr>
						<th>S/N</th>
						<th>Commande ID</th>
						<th>Description</th>
						<th>Quantity</th>
						<th>Date</th>
						<th>Amount</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className="text-center">
					{filteredCommandes.map((commande, index) => (
						<tr key={commande.id}>
							<td>{index + 1}</td>
							<td>{commande.id}</td>
							<td>{commande.description}</td>
							<td>{commande.quantite}</td>
							<td>{commande.date}</td>
							<td>{commande.montant}</td>
							<td>
								<button
									className="btn btn-danger btn-sm"
									onClick={() => handleCommandeCancellation(commande.id)}>
									Cancel
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{filteredCommandes.length === 0 && <p>No commandes found for the selected dates</p>}
		</section>
	);
};

export default CommandesTable;
