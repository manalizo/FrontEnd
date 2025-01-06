import axios from "axios"

export const api=axios.create({
    baseURL:"http://localhost:8083"
})
/*function add new room to the database*/


export async function getAllProducts() {
  try {
    const result = await api.get('/products');
    return result.data;
  } catch (error) {
    throw new Error('Error fetching products');
  }
}
/*
export async function addProduct(productData) {
  const response = await api.post('/products/create', productData);
  return response.data;
}*/

export async function addProduct(titre,description,image,prix){
    const formData=new FormData()
	formData.append("titre",titre)
    formData.append("description",description)
	formData.append("image",image)
	formData.append("prix",prix)
    const response = await api.post('/products/create', formData);
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
  try {
    const result = await api.get(`/products/${productId}`);
    return result.data;
  } catch (error) {
    throw new Error('Error fetching product');
  }
}



















export async function addRoom(photo,roomType,roomPrice){
    const formData=new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)
    
    const response=await api.post("/rooms/add/new-room",formData)
    if(response.status===201){
        return true
    }
    else{
        return false
    }
    
}


/* This function gets all rooms from the database */
export async function getAllRooms() {
	try {
		const result = await api.get("/rooms/all-rooms")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}

}

export async function deleteRoom(roomId) {
	try {
		const result = await api.delete(`rooms/delete/room/${roomId}`)
		
		return result.data
	} catch (error) {
		throw new Error(`Error deleting room ${error.message}`)
	}

}
/* This function update a room */
export async function updateRoom(roomId, roomData) {
    const formData = new FormData();
    formData.append("roomType", roomData.roomType);
    formData.append("roomPrice", roomData.roomPrice);
    const response = await api.put(`/rooms/update/${roomId}`, formData);
   return response;
} 


/* This funcction gets a room by the id */
export async function getRoomById(roomId) {
	try {
		const result = await api.get(`/rooms/room/${roomId}`)
		return result.data
	} catch (error) {
		throw new Error(`Error fetching room ${error.message}`)
	}
}

/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
	try {
		const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}
/*function add new table to the database*/
export async function addDiningTable(Name, numberOfGuests,Location){
    const formData=new FormData()
    formData.append("Name",Name)
    formData.append("numberOfGuests",numberOfGuests)
    formData.append("Location",Location)
    
    const response=await api.post("/tables/add/new-table",formData)
    if(response.status===201){
        return true
    }
    else{
        return false
    }
    
}
/* This function gets all Tables from the database */
export async function getAllTables() {
	try {
		const result = await api.get("/tables/all-tables")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}

}
/* This function delete a table */
export async function deleteTable(tableId) {
	try {
		const result = await api.delete(`tables/delete/table/${tableId}`)
		
		return result.data
	} catch (error) {
		throw new Error(`Error deleting table ${error.message}`)
	}

}
/* This function update a table */
export async function upadateTable(tableId, tableData) {
    const formData = new FormData();
    formData.append("Name", tableData.Name);
    formData.append("numberOfGuests", tableData.numberOfGuests);
	formData.append("Location", tableData.Location);
	
    const response = await api.put(`/tables/update/${tableId}`, formData);
   return response;
} 

/* This function gets all Tables from the database */
export async function getAllBookings() {
	try {
		const result = await api.get("/bookings/all-bookings")
		return result.data
	} catch (error) {
		throw new Error("Error fetching rooms")
	}}