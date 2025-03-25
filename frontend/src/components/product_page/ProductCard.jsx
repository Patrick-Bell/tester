import React, { useState } from "react"
import ShoppingCartSide from "./ShoppingCartSide"
import { useCart } from "../context/CartContext"

const ProductCard = ({ product }) => {

    const [open, setOpen] = useState(false)
    const { cart, addItemToCart, removeItemFromCart } = useCart()

    const handleClick = (product) => {
        addItemToCart(product)
        setOpen(true)
    }

    const viewProduct = (id) => {
      window.location.href = `/products/${id}`
    }

    const displayTag = (product) => {
      switch (product?.tag) {
        case 'new':
          return <span className="bg-green-500 p-1 font-bold rounded-md text-white text-xs">New</span>
        case 'sale':
          return <span className="bg-black font-bold p-1 rounded-md text-white text-xs">Sale</span>
          case 'limited':
          return <span className="bg-yellow-800 font-bold p-1 rounded-md text-white text-xs">Limited</span>
          case 'popular':
          return <span className="bg-red-500 font-bold p-1 rounded-md text-white text-xs">Popular</span>
        default:
          return null
      }
    }

    const inStock = (product) => {
      if(product.stock > 0) {
        return <p className="mt-1 text-sm text-green-500 font-bold">In Stock</p>
      } else {
        return <p className="mt-1 text-sm text-red-500 font-bold">Out of Stock</p>
      }
    }

    return (

<>
<div key={product.id} className="relative flex flex-col h-full pointer-events-auto">
  <div className="absolute top-1 right-1">{displayTag(product)}</div>
          <img
            alt={product.name}
            src={product.image}
            className="aspect-square w-full rounded-md bg-gray-600 object-cover group-hover:opacity-75"
          />
          <div className="flex flex-col flex-grow justify-between p-2">
            <div className='flex justify-between align-middle'>
              <h3 className="text-sm text-gray-700">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              {product.sale_price > 0 ? (
                <div>
                  <p className="text-sm font-medium line-through text-red-500">£{product.sale_price}</p>
                  <p className="text-sm font-bold text-gray-900">£{product.price}</p>
                </div>
              ):(
                <p className="text-sm font-bold text-gray-900">£{(product.price).toFixed(2)}</p>
              )}
            </div>
              {inStock(product)}
          </div>
          <button
          onClick={() => handleClick(product)}
          disabled={product.stock === 0}
          className="text-sm bg-indigo-500 w-full p-1 rounded-sm hover:bg-indigo-800 text-white mt-auto pointer-events-auto z-50 cursor-pointer">
          Add to cart
          </button>
          <button
          onClick={() => viewProduct(product.id)}
          className="text-sm bg-indigo-500 w-full p-1 rounded-sm hover:bg-indigo-800 text-white mt-1 pointer-events-auto z-50 cursor-pointer">
          View Product
          </button>
        </div>

        <ShoppingCartSide setOpen={setOpen} open={open} />
        </>

    )
}

export default ProductCard