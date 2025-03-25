import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'
import { toast } from 'sonner'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import { getProducts } from '../routes/ProductRoutes'



const BestSells = () => {

    const [products, setProducts] = useState([])
    const { addItemToCart } = useCart()
    const [open, setOpen] = useState(false)

    const fetchProducts = async () => {
        try{
          console.log("API URL:", import.meta.env.VITE_API_BASE_URL)  // Debugging
            const response = await getProducts()
            setProducts(response.slice(0, 6))
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    const handleAddToCart = (product) => {
        // Assuming addItemToCart is a function to add the product to your cart
        addItemToCart(product);
      
        // Displaying success toast notification with action
        toast.success(`Added to Cart`, {
          description: `You have successfully added ${product.name} to your cart.`,
          action: {
            label: 'View Cart', // The label of the action button
            onClick: () => {
              // Assuming you have a function to navigate or open the cart
              setOpen(true);
            },
          },
        });
      };


    return (

        <>

        <ShoppingCartSide open={open} setOpen={setOpen} />

        <div className='w-auto m-8 mt-16'>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Best Sellers.</h2>
          <p className='cursor-pointer font-bold flex'>View all
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
          </p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
  {products.map((product, i) => (
    <div key={i} className='border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300'>
      <img className='w-40 sm:w-32 md:w-60 lg:w-48 xl:w-full object-cover mx-auto' src={product.image} alt={product.name} />
      <div className='p-4'>
        <p className='text-sm font-semibold text-gray-800'>{product.name}</p>
        <p className='text-sm font-bold text-indigo-600 mt-2'>£{(product.price).toFixed(2)}</p>
        <button onClick={() => handleAddToCart(product)} className='cursor-pointer text-sm w-full p-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors'>
          Add to Cart
        </button>
      </div>
    </div>
  ))}
</div>




        </div>
        </>
    )
}

export default BestSells