import React from "react"
import { Route, Routes, matchPath, useLocation} from "react-router-dom"
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
import { Helmet } from 'react-helmet'
import { useAuth } from "./components/context/AuthContext"
import ChangePassword from "./components/modals/ChangePassword"
import ProtectedRoute from "./components/app/ProtectedRoute"

const App = () => {

  const location = useLocation(); // Get the current location
  const { user } = useAuth()


  const getRoute = (path) => {

    if (matchPath("/products/:id", location.pathname)) {
      console.log(location.pathname, 'pathname')
      return { title: `Product Details | MinifigaMania`,};
  }

    switch (path) {
      case '/':
        return { title: 'Home | MinifigsMania' };
      case '/about':
        return { title: 'About | MinifigsMania' }
      case '/products':
        return { title: 'Products | MinifigsMania' };
      case '/success':
        return { title: 'Order Successful | MinifigsMania' }
      case '/cancel':
        return { title: 'Order Cancelled | MinifigsMania' };
      case '/refund':
        return { title: 'Refund | MinifigsMania' };
      case '/cart':
        return { title: 'Cart | MinifigsMania' };
      case '/frequently-asked-questions':
        return { title: 'FAQ | MinifigsMania' };
      case '/contact':
        return { title: 'Contact | MinifigsMania' };
      case '/shipping':
        return { title: 'Shipping | MinifigsMania' };
      case '/privacy-policy':
        return { title: 'Privacy Policy | MinifigsMania' };
      case '/admin':
        return { title: 'Admin | MinifigsMania' };
      case '/my-dash':
        return { title: `${user?.user.name}'s Dashboard | MinifigsMania`}
      case '/reset-password':
        return { title: 'Reset Password | MinifigsMania' };
      default:
        return { title: 'Page Not Found | Fiortech Recruitment Group' };
    }
  };
  
  const { title } = getRoute(location.pathname);

  return (
<>

<Helmet>
  <title>{title}</title>

</Helmet>


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
    <Route path="/reset-password" element={<ChangePassword />}></Route>


    <Route path="/admin"
      element={
        <ProtectedRoute>
          <Sidebar />
        </ProtectedRoute>
      }
      >
    </Route>

    <Route
  path="/my-dash"
  element={
    <ProtectedRoute requiredRole="user">
      <UserSidebar />
    </ProtectedRoute>
  }
/>
  </Routes>
  </>

  
  )


}

export default App