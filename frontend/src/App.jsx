'use client'
import React from "react"

import { Route, Routes } from "react-router-dom"
import Navbar from "./components/front_page/Navbar"
import MainPage from "./components/front_page/MainPage"
import ProductFilter from "./components/product_page/ProductFilter"
import DynamicProductPage from "./components/dynamic_product/DynamicProductPage"
import Cancel from "./components/stripe/Cancel"
import Success from "./components/stripe/Success"
import Sidebar from "./components/admin/Sidebar"
import AdminTest from './components/admin/AdminTest'
import { Toaster } from "sonner"
import Refund from "./components/refund/RefundPage"
import AboutPage from './components/about/AboutPage'
const App = () => {

  return (
<>
<Toaster />
    <Routes>
    <Route path="/" element={<MainPage />}></Route>
    <Route path="/products" element={<ProductFilter />}></Route>
    <Route path="/products/:id" element={<DynamicProductPage />}></Route>
    <Route path="/cancel" element={<Cancel />}></Route>
    <Route path="/success" element={<Success />}></Route>
    <Route path="/refund" element={<Refund />}></Route>
    <Route path="/about" element={<AboutPage />}></Route>

    <Route path="/admin" element={<Sidebar />}></Route>
    <Route path="/admin-test" element={<AdminTest />}></Route>
    
  </Routes>
  </>

  
  )


}

export default App