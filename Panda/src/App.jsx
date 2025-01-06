                                
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'

import "/node_modules/bootstrap/dist/js/bootstrap.min.js"


import "/node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddProduct from "./components/product/AddProduct"
import Home from './components/home/Home'
import ExistingRooms from './components/product/ExistingProduct'
import { Routes, Route } from "react-router-dom"
import EditRoom from './components/product/EditProduct'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import RoomListing from "./components/product/ProductListing"
import Admin from './components/admin/Admin'
import BookingSuccess from "./components/Order/BookingSuccess"
import Checkout from "./components/Order/Checkout"
import Bookings from "./components/Order/Bookings"
import FindBooking from "./components/Order/FindBooking"
function App() {
  const [count, setCount] = useState(0)

  return (
    
      
    <main>
    <NavBar/>
      
        <Routes>
        
        <Route path="/browse-all-rooms" element={<RoomListing />} /> 
          <Route path="/existing-rooms"  exact element={<ExistingRooms/>}/>
          <Route path="/add-product"  exact element={<AddProduct/>}/>
          <Route path="/edit-room/:roomId"  exact element={<EditRoom/>}/>
          <Route path="/admin"  exact element={<Admin/>}/>
          <Route path="/booking-success" element={<BookingSuccess />} />
						<Route path="/book-room/:roomId" element={<Checkout />} />
						
         <Route path="/existing-bookings" exact element={<Bookings/>}/>
         <Route path="/find-booking" element={<FindBooking />} />
     
        
        <Route path="/"  exact element={<Home/>}></Route>
        </Routes>
        
      <Footer/>
    </main>
   

      
    
  )
}

export default App