import React, { useEffect, useState } from 'react'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import { useCart } from '../context/CartContext'
import { getProducts } from '../routes/ProductRoutes'
import UseShowProducts from './UseShowProducts'

const NewReleases = () => {

    const [products, setProducts] = useState([])
    const [open, setOpen] = useState(false)

    const fetchProducts = async () => {
        try{
            const response = await getProducts()
            setProducts(response.filter(item => item.active).slice(2, 7))
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <>
        <ShoppingCartSide open={open} setOpen={setOpen} />
        <UseShowProducts title={'New Releases'} products={products} />
        </>
    )
}

export default NewReleases