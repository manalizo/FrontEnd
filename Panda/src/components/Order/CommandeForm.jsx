import React, { useState } from "react";

import { Form, FormControl, Button } from "react-bootstrap";
import { addCommande } from "../utils/ApiFunctions"; // Assuming the API function is set up
import { useNavigate } from "react-router-dom";

const CommandeForm = () => {
    const [validated, setValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [commande, setCommande] = useState({
        description: "",
        quantite: "",
        montant: 0,
        productid: "", // Assuming the product ID is passed from another component
    });

    const navigate = useNavigate();

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommande({ ...commande, [name]: value });
        setErrorMessage(""); // Clear error messages when typing
    };

    // Calculate the total amount based on quantity and fixed price
    const calculateTotalAmount = () => {
        const pricePerItem = 50; // Example fixed price per product
        return commande.quantite * pricePerItem;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
    
        if (form.checkValidity() === false || commande.quantite < 1 || commande.description.trim() === "") {
            e.stopPropagation();
            setErrorMessage("Please ensure all fields are correctly filled.");
        } else {
            setValidated(true);
            try {
                const response = await addCommande(
                    commande.description,
                    commande.quantite,
                    calculateTotalAmount(),
                    commande.productid
                );
                setIsSubmitted(true);
                navigate("/commande-success", { state: { message: response.confirmationCode } });
            } catch (error) {
                console.error(error);  // Log full error for inspection
                setErrorMessage(
                    error.response?.data?.message || "An error occurred while submitting the form."
                );
            }
        }
    };
    
    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body mt-5">
                        <h4 className="card-title">Create Commande</h4>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            {/* Description */}
                            <Form.Group>
                                <Form.Label htmlFor="description">Product/Order Description</Form.Label>
                                <FormControl
                                    required
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={commande.description}
                                    placeholder="Enter product description"
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a description for the order.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Quantity */}
                            <Form.Group>
                                <Form.Label htmlFor="quantite">Quantity</Form.Label>
                                <FormControl
                                    required
                                    type="number"
                                    id="quantite"
                                    name="quantite"
                                    value={commande.quantite}
                                    min={1}
                                    placeholder="1"
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid quantity.
                                </Form.Control.Feedback>
                            </Form.Group>


                            {/* Product ID */}
                            <Form.Group>
                                <Form.Label htmlFor="productid">Product ID</Form.Label>
                                <FormControl
                                    required
                                    type="text"
                                    id="productid"
                                    name="productid"
                                    value={commande.productid}
                                    placeholder="Enter product ID"
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please enter a valid product ID.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Error Message */}
                            {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}

                            <div className="form-group mt-2 mb-2">
                                <Button type="submit" className="btn btn-primary">
                                    Continue
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="col-md-4">
                    {isSubmitted && (
                        <div>
                            <h5>Summary:</h5>
                            <p>Description: {commande.description}</p>
                            <p>Quantity: {commande.quantite}</p>
                            <p>Total Amount: ${calculateTotalAmount()}</p>
                            <p>Date: {commande.date}</p>
                            <p>Product ID: {commande.productid}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandeForm;
