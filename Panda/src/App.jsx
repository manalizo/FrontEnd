                                
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react'
import './App.css'

import "/node_modules/bootstrap/dist/js/bootstrap.min.js"


import "/node_modules/bootstrap/dist/css/bootstrap.min.css"
import AddProduct from "./components/product/AddProduct"
import Home from './components/home/Home'


import Admin from './components/admin/Admin'
import CommandeSuccess from "./components/Order/CommandeSuccess"
import Checkout from "./components/Order/Checkout"
import Commandes from "./components/Order/Commandes" // Updated component name
import FindCommande from "./components/Order/FindCommande" // Updated component name




import ExistingProduct from './components/product/ExistingProduct'
import { Routes, Route } from "react-router-dom"
import EditProduct from './components/product/EditProduct'
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'
import ProductListing from "./components/product/ProductListing"

import Login from "./components/auth/Login"
import Registration from "./components/auth/Registration"
import Profile from "./components/auth/Profile"
import { AuthProvider } from "./components/auth/AuthProvider"
import RequireAuth from "./components/auth/RequireAuth"

function App() {
  const [count, setCount] = useState(0)

  return (
    
    <AuthProvider>
    <main>
    <NavBar/>
      
        <Routes>

    
                
        <Route path="/commande-success" element={<CommandeSuccess />} />
     
        <Route path="/existing-commandes" exact element={<Commandes/>}/>
        <Route path="/find-commande" element={<FindCommande />} />
        <Route path="/" exact element={<Home/>}></Route>


        <Route path="/browse-all-products" element={<ProductListing />} /> 
          <Route path="/existing-products"  exact element={<ExistingProduct/>}/>
          <Route path="/add-product"  exact element={<AddProduct/>}/>
          <Route path="/edit-product/:productId"  exact element={<EditProduct/>}/>
          <Route path="/admin"  exact element={<Admin/>}/>
     
						<Route path="/commande-product/:productId" 
            element={<Checkout />} />
						
         <Route path="/existing-commandes" exact element={<Commandes/>}/>
         <Route path="/login" element={<Login />} />
						<Route path="/register" element={<Registration />} />

						<Route path="/profile" element={<Profile />} />
        
        <Route path="/"  exact element={<Home/>}></Route>
        </Routes>
        
      <Footer/>
    </main>
   
    </AuthProvider>
      
    
  )
}

export default App