import Navbar from "../front_page/Navbar";
import { StarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { MinusIcon, PlusIcon, TruckIcon, CheckIcon, ArrowsRightLeftIcon } from '@heroicons/react/20/solid'
import Footer from "../front_page/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import FAQSection from "./FAQ";
import { TbTruckReturn } from "react-icons/tb";




const DynamicProductPage = () => {

      const { id } = useParams()
      const { addItemToCart } = useCart()
      const [product, setProduct] = useState(null)

      const fetchProduct = async () => {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`)
        setProduct(response.data)
      }

      useEffect(() => {
        fetchProduct()
      }, [])

      const filters = [
        {
          id: 1,
          name: 'Description',
          icon: <CheckIcon />,
          message: [`${product?.name} custom minifigure`,'This is NOT official LEGO', 'Compatible with LEGO', 'Weight: 0.5g', 'Height: 4.5cm', 'Includes trophy, football and miniture figure',]
        },
        {
          id: 2,
          name: 'Shipping',
          icon: <TruckIcon />,
          message: ['Order now and recieve by Sunday 2nd March', 'Shipping costs depend on number of minifigures/weight', 'Shipping may change during public holidays']
        },
        {
          id: 3,
          name: 'Returns',
          message: ['We do not cover the costs of returns', 'Product must be in original packaging', 'Returns must be made within 14 days of purchase', ]
        },
      ]

      const tabs = ["Reviews", "FAQ", "Other"];
      const [activeTab, setActiveTab] = useState(tabs[0]);



    return (
        <>
    


            <Navbar />
            <div className="flex flex-col md:flex-row justify-center p-6 mx-auto gap-6">
                {/* Product Image */}
                <div className="">
                    <img className="rounded-lg" src={product?.image} alt={product?.name} />
                </div>
                
                {/* Product Details */}
                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product?.name}</h1>
                    <p className="text-gray-700 text-2xl">£{product?.price}</p>
                    <div className="flex items-center">
                        <StarIcon className="h-4 text-yellow-500" />
                        <StarIcon className="h-4 text-yellow-500"  />
                        <StarIcon className="h-4 text-yellow-500" />
                        <StarIcon className="h-4 text-yellow-500" />
                        <StarIcon className="h-4 text-yellow-500" />
                        <p className="ml-2 cursor-pointer">(23)</p>
                    </div>
                    <p className="text-sm text-gray-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam tempore numquam quo ratione reiciendis animi modi dolor quasi aspernatur ullam, porro soluta corporis deleniti. Consectetur minus omnis ipsam accusantium quisquam?</p>
                    <button 
                    onClick={() => addItemToCart(product)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 cursor-pointer transition">
                        Add to Cart
                    </button>
                    <form className="mt-4 border-t border-gray-200">               

                    {filters.map((section) => (
                        <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                          <h3 className="-mx-2 -my-3 flow-root">
                            <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-indigo-500">
                              <span className="font-medium text-gray-400 text-sm">{section.name}</span>
                              <span className="ml-6 flex items-center">
                                <PlusIcon aria-hidden="true" className="size-5 group-data-open:hidden" />
                                <MinusIcon aria-hidden="true" className="size-5 group-not-data-open:hidden" />
                              </span>
                            </DisclosureButton>
                          </h3>
                          <DisclosurePanel className="pt-6 text-sm text-gray-500">
                            {section.message.map((msg, i) => (
                              <div key={i} className="flex my-2">
                                {section.icon && <div className="size-5 mr-2 text-indigo-600">{section.icon}</div>}
                                {msg}
                              </div>
                            ))} 
                          </DisclosurePanel>
                        </Disclosure>
                      ))}
                       <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-center space-x-4">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-gray-600">Fast Delivery</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span className="text-sm text-gray-600">Genuine Product</span>
                          </div>
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span className="text-sm text-gray-600">Secure Payment</span>
                          </div>
                        </div>
                      </div>
                   </form>
                </div>
                
            </div>

            <div className="p-6">
                {/* Tabs Navigation */}
                <div className="flex space-x-6 border-b border-gray-300">
                    {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                          activeTab === tab
                            ? 'border-indigo-400 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        {tab}  
                    </button>
                    ))}
                </div>
                

                {/* Tab Content */}
                <div className="mt-4">

                {activeTab === 'Reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                </div>
                
                <div className="flex flex-col md:flex-row mb-8">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{product?.rating || 4.3}</div>
                      <div className="flex justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product?.rating || 3) ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-gray-600">56 reviews</p>
                    </div>
                    
                    <div className="mt-6 px-4">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center mb-2">
                          <div className="w-10 text-right text-gray-600">{rating}</div>
                          <div className="ml-2 flex-1">
                            <div className="h-2 bg-gray-200 rounded-full">
                              <div 
                                className="h-2 bg-yellow-400 rounded-full" 
                                style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="ml-2 w-10 text-gray-600 text-sm">
                            {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 7 : rating === 2 ? 2 : 1}%
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8 md:border-l md:border-gray-200">
                    <div className="mb-8 pb-8 border-b border-gray-200">
                      <div className="flex items-start mb-2">
                        <img 
                          src="/api/placeholder/40/40" 
                          alt="User"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-medium">John D.</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span>2 months ago</span>
                          </div>
                        </div>
                      </div>
                      <h5 className="font-semibold mb-2">Amazing LEGO Set!</h5>
                      <p className="text-gray-700">
                        This Millennium Falcon is an incredible build! The details are fantastic and it really captures the look of the ship from the films. Building it was challenging but very enjoyable. Highly recommended for any Star Wars fan.
                      </p>
                    </div>


                    <div className="mb-8 pb-8 border-b border-gray-200">
                      <div className="flex items-start mb-2">
                        <img 
                          src="/api/placeholder/40/40" 
                          alt="User"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-medium">John D.</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span>2 months ago</span>
                          </div>
                        </div>
                      </div>
                      <h5 className="font-semibold mb-2">Amazing LEGO Set!</h5>
                      <p className="text-gray-700">
                        This Millennium Falcon is an incredible build! The details are fantastic and it really captures the look of the ship from the films. Building it was challenging but very enjoyable. Highly recommended for any Star Wars fan.
                      </p>
                    </div>


                    <div className="mb-8 pb-8 border-b border-gray-200">
                      <div className="flex items-start mb-2">
                        <img 
                          src="/api/placeholder/40/40" 
                          alt="User"
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div>
                          <h4 className="font-medium">John D.</h4>
                          <div className="flex items-center text-sm text-gray-600">
                            <div className="flex mr-2">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span>2 months ago</span>
                          </div>
                        </div>
                      </div>
                      <h5 className="font-semibold mb-2">Amazing LEGO Set!</h5>
                      <p className="text-gray-700">
                        This Millennium Falcon is an incredible build! The details are fantastic and it really captures the look of the ship from the films. Building it was challenging but very enjoyable. Highly recommended for any Star Wars fan.
                      </p>
                    </div>
                  </div>
                  
                </div>
              </div>
            )}
                    
                 

                    {activeTab === "FAQ" && 
                    <FAQSection />
                }
                    {activeTab === "Other" && <div>Other Information</div>}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default DynamicProductPage;
