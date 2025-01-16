import React, { useEffect, useState } from "react";
import { getUserCommandes } from "../utils/ApiFunctions"; // Assurez-vous que cette fonction est correctement définie
import { useAuth } from "../auth/AuthProvider"; // Importer useAuth pour accéder au contexte Auth
import moment from "moment";

const Profile = () => {
    const [commandeInfo, setCommandeInfo] = useState([]); // Stocker les commandes
    const [isLoading, setIsLoading] = useState(true); // Indicateur de chargement
    const [error, setError] = useState(""); // Message d'erreur
    const { user } = useAuth(); // Récupérer l'utilisateur connecté depuis AuthProvider

    useEffect(() => {
        if (user && user.sub) { // Vérifier que l'utilisateur est connecté
            getUserCommandes(user.sub)
                .then((data) => {
                    console.log("Commandes récupérées :", data); // Débogage
                    setCommandeInfo(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error("Erreur lors du chargement des commandes :", error);
                    setError("Impossible de charger les commandes.");
                    setIsLoading(false);
                });
        } else {
            setError("Utilisateur non connecté ou email manquant.");
            setIsLoading(false);
        }
    }, [user]);

    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <h1 className="text-center">Mon Profil</h1>
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div>Chargement des commandes...</div>
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
                            <th>Product ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {commandeInfo.map((commande, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{commande.id}</td>
                                <td>{commande.description}</td>
                                <td>{commande.quantite}</td>
                                <td>{moment(commande.date).format("YYYY-MM-DD")}</td>
                                <td>{commande.montant}</td>
                                <td>{commande.email || "Non disponible"}</td>
                                <td>{commande.productid || "Non disponible"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </section>
    );
};

export default Profile;
