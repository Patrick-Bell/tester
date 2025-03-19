import React, { useEffect, useState } from 'react';
import Navbar from "../front_page/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import Footer from "../front_page/Footer";
import FAQSection from "./FAQ";
import Reviews from "./Reviews";
import ProductData from "./ProductData";
import RelatedProducts from "./RelatedProducts";

const DynamicProductPage = () => {
    const { id } = useParams();
    const { addItemToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("Reviews");

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error("Error fetching product:", error);
        } finally {
            setTimeout(() => setPageLoading(false), 1000); // Simulate loading time
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    const validReviews = product?.reviews?.filter(review => review.reviewed === true) || [];
    const rating = validReviews.length
        ? validReviews.reduce((acc, item) => acc + item.rating, 0) / validReviews.length
        : 0;

    return (
        <>
            <Navbar />

            <div className="max-w-7xl mx-auto">
              <ProductData product={product} rating={rating} validReviews={validReviews} isLoading={pageLoading} />

            {/* Tabs & Content */}
            <div className="p-6">
                {/* Tabs Navigation Skeleton */}
                {pageLoading ? (
                    <div className="flex space-x-6">
                        <div className="h-10 w-24 bg-gray-300 rounded"></div>
                        <div className="h-10 w-24 bg-gray-300 rounded"></div>
                        <div className="h-10 w-24 bg-gray-300 rounded"></div>
                    </div>
                ) : (
                    <div className={`flex space-x-6 border-b border-gray-300`}>
                        {["Reviews", "FAQ", "Related Products"].map((tab) => (
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
                )}

                {/* Tab Content Skeleton */}
                <div className="mt-4">
                    {pageLoading ? (
                        <div className="h-40 bg-gray-300 animate-pulse rounded"></div>
                    ) : (
                        <>
                            {activeTab === "Reviews" && <Reviews product={product} />}
                            {activeTab === "FAQ" && <FAQSection />}
                            {activeTab === "Related Products" && <RelatedProducts product={product} />}
                        </>
                    )}
                </div>
            </div>
            </div>

            <Footer />
        </>
    );
};

export default DynamicProductPage;
