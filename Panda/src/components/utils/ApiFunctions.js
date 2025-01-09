import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8084",
});

/* Gestion des produits */
export async function getAllProducts() {
    try {
        const result = await api.get("/products");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching products");
    }
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
    const response = await api.delete(`/products/${productId}`);
    return response.data;
}

export async function updateProduct(productId, productData) {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
}

export async function getProductById(productId) {
    const response = await api.get(`/products/${productId}`);
    return response.data;
}

export async function getProductImageById(productId) {
    try {

const url = "http://localhost:8084/products/${productId}/image";
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


/* Gestion des commandes */
export async function addCommande(description, quantite, date, montant, productid) {
    const formData = new FormData();
    formData.append("description", description);
    formData.append("quantite", quantite);
    formData.append("date", date);
    formData.append("montant", montant);
    formData.append("productid", productid);

    const response = await api.post("/commandes/create", formData);
    return response.data;
}

export async function deleteCommande(commandeId) {
    const response = await api.delete(`/commandes/delete/${commandeId}`);
    return response.data;
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

/* Gestion des utilisateurs (Authentification) */
// Fonction pour enregistrer un utilisateur
export async function registerUser(username, email, password) {
    try {
        const response = await api.post("/auth/register", {
            username,
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erreur lors de l'enregistrement"
        );
    }
}

// Fonction pour connecter un utilisateur
export async function loginUser(username, password) {
    try {
        const response = await api.post("/auth/login", {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erreur lors de la connexion"
        );
    }
}

// Fonction pour vérifier un token
export async function verifyToken(token) {
    try {
        const response = await api.get("/auth/verify", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Token invalide ou expiré"
        );
    }
}

// Fonction pour déconnecter un utilisateur
export async function logoutUser() {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Erreur lors de la déconnexion"
        );
    }
}

/* Gestion des chambres */
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

export async function deleteRoom(roomId) {
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting room ${error.message}`);
    }
}

export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response;
}

export async function getRoomById(roomId) {
    try {
        const result = await api.get(`/rooms/room/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`);
    }
}

export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error booking room : ${error.message}`);
        }
    }
}

/* Gestion des tables */
export async function addDiningTable(Name, numberOfGuests, Location) {
    const formData = new FormData();
    formData.append("Name", Name);
    formData.append("numberOfGuests", numberOfGuests);
    formData.append("Location", Location);

    const response = await api.post("/tables/add/new-table", formData);
    if (response.status === 201) {
        return true;
    } else {
        return false;
    }
}

export async function getAllTables() {
    try {
        const result = await api.get("/tables/all-tables");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

export async function deleteTable(tableId) {
    try {
        const result = await api.delete(`/tables/delete/table/${tableId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting table ${error.message}`);
    }
}

export async function upadateTable(tableId, tableData) {
    const formData = new FormData();
    formData.append("Name", tableData.Name);
    formData.append("numberOfGuests", tableData.numberOfGuests);
    formData.append("Location", tableData.Location);

    const response = await api.put(`/tables/update/${tableId}`, formData);
    return response;
}

export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}
