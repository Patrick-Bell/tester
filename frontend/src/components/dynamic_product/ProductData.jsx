import { MinusIcon, PlusIcon, TruckIcon, CheckIcon } from '@heroicons/react/20/solid';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'

const ProductData = ({ product, rating, validReviews, isLoading }) => {
    const [selectedImage, setSelectedImage] = useState('');

    const { addItemToCart } = useCart()

useEffect(() => {
    if (product?.images?.length) {
        setSelectedImage(product.images[0].url);
    }
}, [product]);

    
    const filters = [
        {
            id: 1,
            name: 'Description',
            icon: <CheckIcon />,
            message: [
                `${product?.name} custom minifigure`, 
                `Category: ${product?.category}`,
                'Compatible with major brands such as LEGO', 
                `Weight: ${product?.weight}g`, 
                `Height: ${product?.height}cm`, 
                `Accessories: ${product?.accessories}.`
            ]
        },
        {
            id: 2,
            name: 'Shipping',
            icon: <TruckIcon />,
            message: [
                'Order now and receive by Sunday 2nd March', 
                'Shipping costs depend on number of minifigures/weight', 
                'Shipping may change during public holidays'
            ]
        },
        {
            id: 3,
            name: 'Returns',
            message: [
                'We do not cover the costs of returns', 
                'Product must be in original packaging', 
                'Returns must be made within 14 days of purchase'
            ]
        },
    ];

    const goBack = () => window.history.back();

    return (
        <div className="flex flex-col md:flex-row justify-center p-6 mx-auto gap-6">
            {/* Product Images */}
            <div className="flex flex-col items-center md:items-start space-y-4">
                {isLoading ? (
                    <div className="w-[300px] h-[300px] bg-gray-300 animate-pulse rounded-lg"></div>
                ) : (
                    <div className="flex flex-col items-center">
                        {/* Main Image */}
                        <img 
                            className="rounded-lg border border-gray-200 w-100 h-100 object-cover" 
                            src={selectedImage} 
                            alt={product?.name} 
                        />

                        {/* Thumbnails */}
                        <div className="flex gap-2 mt-2">
                            {product?.images.map((img, i) => (
                                <img 
                                    key={i} 
                                    className={`w-16 h-16 rounded-lg border border-gray-200 cursor-pointer object-cover transition ${
                                        selectedImage === img.url ? 'border-indigo-500' : 'hover:border-indigo-500'
                                    }`} 
                                    src={img.url} 
                                    alt="Thumbnail" 
                                    onClick={() => setSelectedImage(img.url)} 
                                />
                            ))}
                        </div>
                    </div>

                )}
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
                {/* Title & Back Button */}
                <div className="flex justify-between items-center">
                    {isLoading ? (
                        <div className="h-12 w-2/3 bg-gray-300 animate-pulse rounded"></div>
                    ) : (
                        <h1 className="text-3xl font-bold">{product?.name}</h1>
                    )}

                    <button 
                        onClick={goBack} 
                        className="px-4 py-2 rounded-md border border-[#e9ebee] hover:bg-gray-50 cursor-pointer"
                    >
                        Back
                    </button>
                </div>

                {/* Price Section */}
                {isLoading ? (
                    <div className="h-6 w-1/4 bg-gray-300 animate-pulse rounded"></div>
                ) : product?.sale_price > 0 ? (
                    <div className="flex">
                        <p className="text-2xl font-medium line-through text-red-500">£{product.sale_price}</p>
                        <p className="text-2xl ml-3 font-medium text-gray-900">£{product?.price}</p>
                    </div>
                ) : (
                    <p className="text-2xl font-medium text-gray-900">£{product?.price}</p>
                )}

                {/* Star Rating */}
                <div className="flex items-center">
                    {isLoading ? (
                        <div className="h-5 w-32 bg-gray-300 animate-pulse rounded"></div>
                    ) : (
                        [...Array(5)].map((_, i) => (
                            <svg key={i} xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                                viewBox="0 0 20 20" fill="currentColor"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))
                    )}
                    {!isLoading && <p className="ml-2 text-sm text-gray-600">({validReviews.length})</p>}
                </div>

                {/* Add to Cart */}
                {isLoading ? (
                    <div className="h-12 w-32 bg-gray-300 animate-pulse rounded"></div>
                ) : (
                    <button onClick={() => addItemToCart(product)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition">
                        Add to Cart
                    </button>
                )}

                {/* Collapsible Sections */}
                {isLoading ? (
                    <>
                    <div className="h-30 w-full bg-gray-300 animate-pulse rounded"></div>
                    </>
                ):(
                    <form className="mt-4 border-gray-200">
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
                </form>
                )}
                
            </div>
        </div>
    );
};

export default ProductData;
