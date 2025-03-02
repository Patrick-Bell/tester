import { useState } from "react"
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

    return (

<>
<div key={product.id} className="relative flex flex-col h-full pointer-events-auto">
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
            <p className="text-sm font-medium text-gray-900">£{product.price}</p>
            </div>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              <p className="mt-1 text-sm text-green-500 font-bold">In Stock</p>
          </div>
          <button
          onClick={() => handleClick(product)}
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