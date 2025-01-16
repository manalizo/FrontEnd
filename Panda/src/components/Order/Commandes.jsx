import React, { useState, useEffect } from "react";
import { getAllCommandes } from "../utils/ApiFunctions"; // Supposons que cette fonction existe
import Header from "../common/Header";
import { Link } from "react-router-dom"
const Commandes = () => {
    const [commandeInfo, setCommandeInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllCommandes()
            .then((data) => {
                console.log("Données reçues depuis l'API :", data); // Vérifiez ici
                setCommandeInfo(data); // Enregistrez les données
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Erreur lors du chargement des commandes :", error);
                setIsLoading(false);
            });
    }, []);
    

    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <Header title={" Commandes"} />
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div>Loading existing commandes</div>
            ) : (
                <table className="table table-striped mt-4">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Commande ID</th>
                        <th>Description</th>
                        <th>Quantité</th>
                        <th>Date</th>
                        <th>Montant</th>
                        <th>Email</th>
                        <th>productid</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {commandeInfo.map((commande, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{commande.id}</td>
                            <td>{commande.description}</td>
                            <td>{commande.quantite}</td>
                            <td>{commande.date}</td>
                            <td>{commande.montant}</td>
                            <td>{commande.email || "Non disponible"}</td>
                            <td>{commande.productid || "Non disponible"}</td> 
                            <td>
								 
                                     <Link to={`/product/${commande.productid}`} className="btn btn-hotel btn-sm">
                                                        Product Details
                                                    </Link>
                    
							</td>

                           
                        </tr>
                    ))}
                </tbody>
            </table>
            
            )}
        </section>
    );
};

export default Commandes;
