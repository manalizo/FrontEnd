import axios from "axios";
import moment from "moment";
export const api = axios.create({
    baseURL: "http://localhost:8084",
});
export const apiurl = axios.create({
    baseURL: "http://localhost:8088",
});

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

/* Gestion des produits */
export async function getAllProducts() {
    try {
        const result = await api.get("/products");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching products");
    }
}
export async function editProduct(productId, titre, description, image, prix) {
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    if (image) {
        formData.append("image", image); // Ajouter uniquement si une nouvelle image est fournie
    }
    formData.append("prix", prix);

    const response = await api.put(`/products/${productId}`, formData); // Envoie une requête PUT pour mettre à jour le produit
    return response.data;
}

export async function addProduct(titre, description, image, prix) {
    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("prix", prix);
    const response = await api.post("/products/create", formData);
    return response.data;
}

export async function deleteProduct(productId) {
    try {
      /*  const response = await api.delete(`/products/${productId}`);*/
        const url = `http://localhost:8083/products/${productId}`;
      const result = await axios.delete(url);
       
    } catch (error) {
        console.error('Failed to delete product:', error.response?.data || error.message);
        throw error;
    }
}


export async function updateProduct(productId, productData) {
    const url = `http://localhost:8083/products/${productId}`;
      const result = await axios.put(url,productData);
      return response.data;
}

export async function getProductById(productId) {
    const response = await api.get(`/products/${productId}`);
    return response.data;
}

export async function getProductImageById(productId) {
    try {

const url = `http://localhost:8084/products/${productId}/image`;
      const result = await axios.get(url);

      // Log the entire result to see the response structure
      console.log('Product image response:', result);

      // Log just the base64 image data to see the image data string
      console.log('Base64 image data:', result.data);

      return result.data; // This will be the base64 string
    } catch (error) {
      console.error('Error fetching product image:', error);
      throw new Error('Error fetching product image');
    }
  }
  export async function getUserOrdersByEmail(email) {
    const response = await api.get(`/commandes/${email}`);
    return response.data;
}
  

/* Gestion des commandes */
export async function addCommande(description, quantite, montant, productid,email) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("quantite", quantite);
    formData.append("date", moment().format("YYYY-MM-DD"));
    formData.append("montant", montant);
    formData.append("productid", productid);
    formData.append("email", email);

    const response = await api.post("/commandes/create", formData);
    return response.data;
}

export async function deleteCommande(commandeId) {
    const response = await api.delete(`/commandes/delete/${commandeId}`);

}

export async function updateCommande(commandeId, commandeData) {
    const response = await api.put(`/commandes/${commandeId}`, commandeData);
    return response.data;
}

export async function getAllCommandes() {
    const response = await api.get("/commandes");
    return response.data;
}

export async function getCommandeById(commandeId) {
    const response = await api.get(`/commandes/${commandeId}`);
    return response.data;
}
/* This function register a new user */
export async function registerUser(registration) {
	try {
        const url = `http://localhost:8088/auth/register-user`;
        const response = await axios.post(url,registration);
       
		//const response = await api.post("/auth/register-user", registration)
		return response.data
	} catch (error) {
		if (error.reeponse && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`User registration error : ${error.message}`)
		}
	}
}
export async function loginUser(login) {
	try {
        const url = `http://localhost:8088/auth/login`;
        const response = await axios.post(url,login);
      
		//const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
	try {
        const url = `http://localhost:8088/auth/users/profile/${userId}`;
        const response = await axios.post(url,{
		//const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		return error.message
	}
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}






