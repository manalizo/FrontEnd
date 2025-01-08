import React, { useState, useEffect } from "react";
import { deleteCommande, getAllCommandes } from "../utils/ApiFunctions";  // Assuming these API functions exist
import Header from "../common/Header";
import CommandesTable from "./CommandesTable";  // Assuming a similar table component for orders

const Commandes = () => {
    const [commandeInfo, setCommandeInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setTimeout(() => {
            getAllCommandes()
                .then((data) => {
                    setCommandeInfo(data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setIsLoading(false);
                });
        }, 1000);
    }, []);

    const handleCommandeCancellation = async (commandeId) => {
        try {
            await deleteCommande(commandeId);
            const data = await getAllCommandes();
            setCommandeInfo(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <section style={{ backgroundColor: "whitesmoke" }}>
            <Header title={"Existing Commandes"} />
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div>Loading existing commandes</div>
            ) : (
                <CommandesTable
                    commandeInfo={commandeInfo}
                    handleCommandeCancellation={handleCommandeCancellation}
                />
            )}
        </section>
    );
};

export default Commandes;
