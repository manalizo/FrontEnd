import React, { useEffect, useState } from "react";
import moment from "moment";
import { Form, FormControl, Button } from "react-bootstrap";
import { addCommande } from "../utils/ApiFunctions";  // Assuming the API function is already set up
import { useNavigate } from "react-router-dom";

const CommandeForm = () => {
    const [validated, setValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [commande, setCommande] = useState({
        description: "",
        quantite: "",
        montant: 0,
        date: moment().format("YYYY-MM-DD"), // Default to current date
    });

    const navigate = useNavigate();

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommande({ ...commande, [name]: value });
        setErrorMessage("");  // Clear error messages when typing
    };

    // Calculate the total amount (or price) based on quantity and some fixed price
    const calculateTotalAmount = () => {
        const pricePerItem = 50; // Example fixed price per product (could be fetched from an API)
        return commande.quantite * pricePerItem;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || commande.quantite < 1 || commande.description.trim() === "") {
            e.stopPropagation();
            setErrorMessage("Please ensure all fields are correctly filled.");
        } else {
            setIsSubmitted(true);
        }
        setValidated(true);
    };

    const handleFormSubmit = async () => {
        try {
            // API call to create a new Commande (order)
            const response = await addCommande(commande);
            setIsSubmitted(true);
            navigate("/commande-success", { state: { message: response.confirmationCode } });
        } catch (error) {
            const errorMessage = error.message;
            setErrorMessage(errorMessage);
        }
    };

    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body mt-5">
                        <h4 className="card-title">Create Commande</h4>

                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            {/* Description of the product/order */}
                            <Form.Group>
                                <Form.Label htmlFor="description" className="hotel-color">
                                    Product/Order Description
                                </Form.Label>
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

                            {/* Quantity of the product */}
                            <Form.Group>
                                <Form.Label htmlFor="quantite" className="hotel-color">
                                    Quantity
                                </Form.Label>
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
                                    Please select at least 1 item.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Date of the order */}
                            <Form.Group>
                                <Form.Label htmlFor="date" className="hotel-color">
                                    Order Date
                                </Form.Label>
                                <FormControl
                                    required
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={commande.date}
                                    onChange={handleInputChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please select a valid order date.
                                </Form.Control.Feedback>
                            </Form.Group>

                            {/* Displaying error messages */}
                            {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}

                            <div className="fom-group mt-2 mb-2">
                                <button type="submit" className="btn btn-hotel">
                                    Continue
                                </button>
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
                            <Button onClick={handleFormSubmit} className="btn btn-primary">Confirm Order</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandeForm;
