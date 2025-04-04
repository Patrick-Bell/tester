import React from "react"
import { Route, Routes } from "react-router-dom"
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
import NotFound from "./components/not_found/NotFound"
import UserSidebar from './components/user_dashboard/Sidebar'
import CartPage from "./components/cart/CartPage"
import Contact from "./components/contact/Contact"
import FAQPage from "./components/contact/FAQPage"
import ShippingPage from "./components/contact/ShippingPage"
import PrivacyPolicy from "./components/contact/PrivacyPolicy"

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
    <Route path="*" element={<NotFound />}></Route>
    <Route path="/cart" element={<CartPage />}></Route>
    <Route path="/contact" element={<Contact />}></Route>
    <Route path="/frequently-asked-questions" element={<FAQPage />}></Route>
    <Route path="/shipping" element={<ShippingPage />}></Route>
    <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>

    <Route path="/admin" element={<Sidebar />}></Route>   

    <Route path="/my-dash" element={<UserSidebar />}></Route> 
  </Routes>
  </>

  
  )


}

export default App