import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProducts } from "../routes/ProductRoutes";

const RelatedProducts = ({ product, products, handleAddToCart }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState(null);

  // Fetch related products from the API
  const fetchRelatedProducts = async () => {
    try {
      const response = await getProducts();
      const products = response;
      const validProducts = products.filter(item => item.active)
      
      // Filter products to find those in the same category and excluding the current product
      const relatedProducts = validProducts?.filter(
        (p) => p.category.toLowerCase() === product.category.toLowerCase() && p.id !== product.id
      );
      
      setRelatedProducts(relatedProducts);
    } catch (err) {
      setError("Failed to load related products");
    }
  };

  const handleView = (id) => {
    window.location.href = `/products/${id}`;
  };

  useEffect(() => {
    fetchRelatedProducts();
  }, [product]);  // Re-fetch when the product changes

  return (
    <>
      {error && <p className="text-red-500">{error}</p>} {/* Show error message if any */}
      
      {relatedProducts.length > 0 ? (
        <>
        <p className="mb-3">There are <span className="text-indigo-600 font-bold">{relatedProducts.length}</span> related products.</p>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300">
              <img
                className="w-40 sm:w-32 md:w-60 lg:w-48 xl:w-full object-cover mx-auto"
                src={relatedProduct.images[0].url}
                alt={relatedProduct.name}
              />
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-800">{relatedProduct?.name.length > 16 ? (relatedProduct?.name).slice(0, 16) + '...' : relatedProduct?.name}</p>
                <p className="text-sm font-bold text-indigo-600 mt-2">
                  £{(relatedProduct.price).toFixed(2)}
                </p>
                <button
                  onClick={() => handleAddToCart(relatedProduct)} // Handle add to cart
                  className="cursor-pointer text-sm w-full p-2 mt-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Add to Cart
                </button><button
                  onClick={() => handleView(relatedProduct?.id)} // Handle add to cart
                  className="cursor-pointer text-sm w-full p-2 mt-1 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
        </>
      ) : (
        <p className="text-gray-500">There are no related products</p>
      )}
    </>
  );
};

export default RelatedProducts;
