import { updateProduct, getProductById } from "../utils/ApiFunctions"; // Import update and get functions
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
    const { productId } = useParams(); // Retrieve the product ID from the URL
    const [product, setProduct] = useState({
        titre: "",
        description: "",
        image: null,
        prix: "",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Fetch the product details when the component mounts
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const productData = await getProductById(productId); // Fetch product details from API
                setProduct({
                    titre: productData.titre,
                    description: productData.description,
                    prix: productData.prix,
                    image: null, // Leave image null initially
                });
                setImagePreview(productData.imageUrl); // Assume the API returns an image URL
            } catch (error) {
                setErrorMessage("Failed to fetch product details");
            }
        };

        fetchProduct();
    }, [productId]);

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

        setProduct({ ...product, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setProduct({ ...product, image: selectedImage });
        setImagePreview(URL.createObjectURL(selectedImage)); // Create an image preview
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await updateProduct(
                productId,
                product.titre,
                product.description,
                product.image,
                product.prix
            ); // Update the product via API
            if (success) {
                setSuccessMessage("Product updated successfully!");
                setErrorMessage("");
            } else {
                setErrorMessage("Error updating product");
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
                        <h2 className="mt-5 mb-2">Edit Product</h2>
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
                                    value={product.titre}
                                    onChange={handleProductInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description">Product Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={product.description}
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
                                    value={product.prix}
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
                                <button className="btn btn-outline-primary">Update Product</button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditProduct;
