import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from '../product_page/ProductCard'
import { getProducts } from '../routes/ProductRoutes'

const ComingSoon = () => {

    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try{
            const response = await getProducts()
            setProducts(response.filter(product => product.active === false || product.stock === 0).slice(0, 6))
        }catch(e){
            console.log(e)
        }
    }

    const handleClick = (id) => {
        window.location.href = `/products/${id}`
    }

    useEffect(() => {
        fetchProducts()
    }, [])


    return (

        <>
        <div className='w-auto m-8 mt-16'>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Coming Soon</h2>
          <p className='cursor-pointer font-bold flex'>View all
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
          </svg>
          </p>
        </div>
          <p className='mb-6 text-sm text-gray-600'>Minifigures will be either newly released or re-stocked</p>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6'>
  {products.map((product, i) => (
    <ProductCard product={product} />
  ))}
</div>




        </div>
        </>
    )
}

export default ComingSoon