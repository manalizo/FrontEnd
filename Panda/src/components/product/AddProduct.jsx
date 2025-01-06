import { addProduct } from "../utils/ApiFunctions";  // Import the addProduct function from API utils
import React, { useState } from "react";

const AddProduct = () => {
    const [newProduct, setNewProduct] = useState({
        titre: "",
        description: "",
        image: null,
        prix: "",
    
    });
    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleProductInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "prix") {
            if (!isNaN(value)) {
                value = parseFloat(value); // Ensure it's a number
            } else {
                value = ""; // Reset value if not a number
            }
        }

        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setNewProduct({ ...newProduct, image: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage)); // Create an image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await addProduct(newProduct.titre,newProduct.description,newProduct.image,newProduct.prix);  // Send the new product data to API
            if (success) {
                setSuccessMessage("Product added successfully!");
                setNewProduct({ titre: "", description: "", prix: "", image: null }); // Reset form
                setImagePreview(""); // Reset image preview
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding product");
            }
        } catch (error) {
            setErrorMessage(error.message); // Set error message on failure
        }
    };

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Product</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show">{successMessage}</div>
                        )}
                        {errorMessage && <div className="alert alert-danger fade show">{errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="titre">Product Title</label>
                                <input
                                    className="form-control"
                                    id="titre"
                                    name="titre"
                                    type="text"
                                    value={newProduct.titre}
                                    onChange={handleProductInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description">Product Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleProductInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="prix">Product Price</label>
                                <input
                                    className="form-control"
                                    id="prix"
                                    name="prix"
                                    type="number"
                                    value={newProduct.prix}
                                    onChange={handleProductInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Product Image</label>
                                <input
                                    id="image"
                                    name="image"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview Product Image"
                                        style={{ maxWidth: "400px", maxHeight: "400px" }}
                                        className="mb-3"
                                    />
                                )}
                            </div>

                            <div className="d-grid md-flex mt-2">
                                <button className="btn btn-outline-primary">Save Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddProduct;
