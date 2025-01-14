import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { addCommande, getProductById } from "../utils/ApiFunctions"; // Assuming getProductById is set up
import { useNavigate, useParams } from "react-router-dom";
import CommandeSummary from "./CommandeSummary"; // Import CommandeSummary component
import { useAuth } from "../auth/AuthProvider"; // Assuming AuthContext is used to fetch user data

const CommandeForm = () => {
    const [validated, setValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { productId } = useParams();
    const [commande, setCommande] = useState({
        description: "",
        quantite: "",
        montant: 0,
        productid: productId, // Assuming the product ID is passed as a param
        date: new Date(), // Add the current date for the summary
        email: "", // Add email field to the state
    });
    const [product, setProduct] = useState(null);
    const [payment, setPayment] = useState(0); // Store the payment amount after calculation

    const { user } = useAuth(); // Access the authenticated user
    const navigate = useNavigate();

    // Fetch product details
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productData = await getProductById(productId);
                setProduct(productData);
                setCommande({
                    ...commande,
                    description: productData.description, // Set description from fetched product
                    email: user?.email || "", // Set user email if authenticated
                });
                setPayment(productData.prix || 0); // Set the price to be used for payment calculation
            } catch (error) {
                setErrorMessage("Error fetching product details");
                console.error(error);
            }
        };

        fetchProductDetails();
    }, [productId, user]); // Run when productid or user changes

    // Handle input change for form fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCommande({ ...commande, [name]: value });
        setErrorMessage(""); // Clear error messages when typing
    };

    // Calculate the total amount based on quantity and price fetched from product
    const calculateTotalAmount = () => {
        const pricePerItem = product?.prix || 0; // Get price from product or default to 0
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
            setIsSubmitted(true); // Set form as submitted but don't proceed to success page yet
        }
    };

    // Confirm order and proceed to success page
    const handleConfirmOrder = async () => {
        try {
            const response = await addCommande(
                commande.description,
                commande.quantite,
                calculateTotalAmount(),
                commande.productid,
                commande.email // Include the email in the API request
            );
            navigate("/commande-success", { state: { message: response.confirmationCode } });
        } catch (error) {
            console.error(error); // Log full error for inspection
            setErrorMessage(
                error.response?.data?.message || "An error occurred while submitting the form."
            );
        }
    };

    if (!product) {
        return <div>Loading...</div>; // Loading state while fetching product details
    }

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
                                    disabled // Disable the description field as it's fetched from the product
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
                                    disabled
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

                {/* Commande Summary: Pass the data to CommandeSummary */}
                <div className="col-md-8">
                    {isSubmitted && (
                        <CommandeSummary
                            commande={commande}
                            payment={calculateTotalAmount()}
                            isFormValid={validated}
                            onConfirm={handleConfirmOrder} // Pass the handleConfirmOrder method
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommandeForm;
