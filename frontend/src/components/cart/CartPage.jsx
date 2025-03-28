import React, { useState } from 'react';
import Navbar from '../front_page/Navbar';
import BestSells from '../front_page/BestSells';
import NewReleases from '../front_page/NewReleases';
import Footer from '../front_page/Footer';
import { useCart } from '../context/CartContext';
import { CreditCard, Lock, } from "lucide-react"


import ApplePay from '../assets/apple-pay.png'
import AmericanExpress from '../assets/american-express.png'
import VisaPay from '../assets/visa.png'
import MasterCardPay from '../assets/card.png'
import RelatedProductsModal from './RelatedProductsModal';

const paymentMethodImages = [
    ApplePay,
    AmericanExpress,
    VisaPay,
    MasterCardPay
  ];

const CartPage = () => {

    const { cart, addItemToCart, updateQuantity, removeItemFromCart } = useCart()
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [open, setOpen] = useState(false)


  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateWeight = () => {
    return (cart.reduce((sum, item) => sum + item.quantity * 0.17, 0) * 100).toFixed(0)
  };

  const calculateShipping = () => {
    const weight = (cart.reduce((sum, item) => sum + item.quantity * 0.17, 0) * 100).toFixed(0)

    if (weight == 0) {
        return 0
    } else if (weight > 0 && weight <= 100) {
        return 1.55
    } else if (weight > 100 && weight <= 250) {
        return (2.10).toFixed(2)
    } else if (weight > 250) {
        return (3.00).toFixed(2)
    }
  }

  const calculateTotal = () => {
    const subTotal = calculateSubtotal()
    const shippingTotal = calculateShipping()

    console.log('subtotal', subTotal, 'shipping total', shippingTotal)

    return (Number(subTotal) + Number(shippingTotal)).toFixed(2)
  }

  const showRelatedProducts = (product) => {
    setSelectedProduct(product)
    setOpen(true)
  }

  const handleClose = () => {
    setSelectedProduct(null)
    setOpen(false)
  }
  


  return (
    <>
    <RelatedProductsModal open={open} setOpen={handleClose} product={selectedProduct}/>
    <Navbar />
    <div className='max-w-7xl mx-auto'>
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-200 pb-4">
            <h1 className="text-3xl font-extrabold text-gray-900">Your Cart</h1>
            <p className="text-gray-600">{cart.length} Items</p>
          </div>
          {cart.length > 0 ? (
            <>
            {cart.map(item => (
            <div 
              key={item.id} 
              className="bg-white rounded-md overflow-hidden"
            >
              <div className="flex flex-col md:flex-row items-center p-4 space-y-4 md:space-y-0 md:space-x-6">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-28 h-28 object-cover rounded-md border border-gray-200"
                />
                
                <div className="flex-grow text-center md:text-left w-full">
                  <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <p className="text-sm text-gray-500">Estimated Weight: {17 * item.quantity}g</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <p onClick={() => showRelatedProducts(item)} className="text-sm text-indigo-500 cursor-pointer">View Related Products</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-200 rounded-full">
                    <button 
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-l-full"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-gray-800">{item.quantity}</span>
                    <button 
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded-r-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="font-semibold text-gray-900">
                    £{(item.price * item.quantity).toFixed(2)}
                  </div>
                  
                  <button 
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
           <div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Leave a note with your order:</p>
                <p className="text-sm text-gray-500">Optional</p>
              </div>
              <textarea
                className="w-full mt-2 p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your note here..."
                rows="4"
              />
            </div>
            </>

          ):(
            <p className='text-gray-400 text-sm'>Your cart is empty. Click <span className='text-indigo-500 cursor-pointer'>here</span> to view all products.</p>
          )}
          
        </div>
        
        {/* Order Summary Section */}
        <div className="bg-white p-6 overflow-auto">
          <h2 className="text-2xl font-bold text-gray-900 pb-4">Order Summary</h2>
          <div className='flex pb-4 gap-3 max-w-100 overflow-auto'>
            {cart.map((item, i) => (
                <>
                <img className='h-20 border border-gray-200 rounded-md relative' src={item.image} />
                </>
            ))}
          </div>
          <div className="space-y-4">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span className="font-semibold">£{calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Estimated Weight</span>
              <span className="font-semibold">{calculateWeight()}g</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span className="font-semibold">£{calculateShipping()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-gray-200 pt-4">
              <span>Total</span>
              <span>£{calculateTotal()}</span>
            </div>
            
            {/* Promotion Code Section */}
            <div className="pt-4 space-y-4">
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Enter promotion code" 
                  className="flex-grow border-2 border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                />
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  Apply
                </button>
              </div>
              
              <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 ease-in-out cursor-pointer">
                Checkout with Stripe
              </button>
            </div>

            <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Security & Privacy</h3>
                    </div>
                </div>
                    <p className='mt-1 text-sm text-gray-400'>Safe payments and secure personal details.</p>
             </div>

             <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Payment Methods</h3>
                    </div>
                    <span className="text-sm text-gray-500">Powered by Stripe</span>
                </div>
                <div className="flex gap-2 mt-2">
                    {paymentMethodImages.map((imgSrc, index) => (
                    <img 
                        key={index} 
                        src={imgSrc} 
                        alt={`Payment method ${index + 1}`} 
                        className="h-10 w-auto border border-gray-200 p-2 rounded-md"
                    />
                    ))}
                </div>
             </div>

             <div className="border-t pb-4 border-b border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-gray-600" />
                    <h3 className="text-lg font-semibold">Fast Delivery</h3>
                    </div>
                </div>
                    <p className='mt-1 text-sm text-gray-400'>Shipped within 24 hours and with you within 5 working days!</p>
             </div>


    
          

          </div>
        </div>

        
      </div>
    </div>
    <BestSells />
    <NewReleases />
    </div>
    <Footer />
    </>
  );
};

export default CartPage;