import React from 'react';
import { Fragment, useState, useEffect } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import Hero from './Hero'
import ShoppingCartSide from '../product_page/ShoppingCartSide'
import LoginPage from '../modals/LoginPage'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext';
import Register from '../modals/Register'
import axios from 'axios'
import { getProducts } from '../routes/ProductRoutes';


const navigation = {
  categories: [
    {
      id: 'products',
      name: 'Products',
      featured: [
        {
          name: 'New Figures',
          href: '#',
          imageSrc:
            'https://tailwindui.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Popular Figures',
          href: '#',
          imageSrc: 'https://tailwindui.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'sports',
          name: 'Sports',
          items: [
            { name: 'Football (most popular)', href: `${import.meta.env.VITE_API_BASE_URL}/products?category=football` },
            { name: 'Basketball', href: '#' },
            { name: 'Other', href: '#' },
          ],
        },
        {
          id: 'tv',
          name: 'TV',
          items: [
            { name: 'Star Wars', href: '#' },
            { name: 'Marvel', href: '#' },
            { name: 'Teenage Mutant Ninja Turtles', href: '#' },
            { name: 'Sonic', href: '#' },
            { name: 'Simpsons', href: '#' },
          ],
        },
        {
          id: 'other',
          name: 'Other',
          items: [
            { name: 'Squid Games', href: '#' },
            { name: 'Military', href: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
}

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [openCart, setOpenCart] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openRegisterModal, setOpenRegisterModal] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([])

  const { cart, cartNumber } = useCart()
  const { user } = useAuth() || {}

  console.log(cart, 'cart', cartNumber)

  const handleOpenCart = () => {
    setOpenCart(true)
  }

  const handleOpenLogin = () => {
    setOpenLoginModal(true)
  }

  const handleOpenRegister = () => {
    setOpenRegisterModal(true)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = getProducts()
      setProducts(res.filter(product => product.active === true))
    }
    fetchProducts()
  }, [])

  const goToDash = () => {
    window.location = '/my-dash'
  }


  return (
    <>
    <ShoppingCartSide open={openCart} setOpen={setOpenCart} />
    <LoginPage isOpen={openLoginModal} setIsOpen={setOpenLoginModal} setRegisterModalOpen={setOpenRegisterModal}/>
    <Register isOpen={openRegisterModal} setIsOpen={setOpenRegisterModal} setOpenLogin={setOpenLoginModal} />
   <div className="bg-white w-full">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-60 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-200 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
          >
            <div className="flex px-4 pt-5 pb-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-900 data-selected:border-indigo-600 data-selected:text-indigo-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pt-10 pb-8">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <img
                            alt={item.imageAlt}
                            src={item.imageSrc}
                            className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                          />
                          <a href={item.href} className="mt-6 block font-medium text-gray-900">
                            <span aria-hidden="true" className="absolute inset-0 z-60" />
                            {item.name}
                          </a>
                          <p aria-hidden="true" className="mt-1">
                            Shop now
                          </p>
                        </div>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>


            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                    {page.name}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a onClick={() => handleOpenLogin()} href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
                </a>
              </div>
      
              <div className="flow-root">
                <a onClick={() => handleOpenRegister()} href="#" className="-m-2 block p-2 font-medium text-gray-900">
                  Create account
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <a href="#" className="-m-2 flex items-center p-2">
                <img
                  alt=""
                  src="https://tailwindui.com/plus-assets/img/flags/flag-united-kingdom.svg"
                  className="block h-auto w-5 shrink-0"
                />
                <span className="ml-3 block text-base font-medium text-gray-900">UK</span>
                <span className="sr-only">, change currency</span>
              </a>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Over 50 products to choose from!
        </p>

        <nav aria-label="Top" className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    alt=""
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                  />
                </a>
              </div>


              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      <div className="relative flex">
                        <PopoverButton className="relative z-60 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in z-60"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />

                        <div className="relative bg-white">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <img
                                      alt={item.imageAlt}
                                      src={item.imageSrc}
                                      className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                    />
                                    <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a href={item.href} className="hover:text-gray-800">
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}


                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </PopoverGroup>



              <div className="ml-auto flex items-center">



                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {!user ? (
                    <>
                    <a onClick={() => handleOpenLogin()} href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800 z-60">
                    Sign in
                  </a>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <a onClick={() => handleOpenRegister()} href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800 z-60">
                    Create account
                  </a>
                  </>
                  ):(
                    <>
                    <p onClick={() => goToDash()} className='text-sm cursor-pointer'>Hi, <strong>{user?.user?.name}</strong> <span aria-hidden="true">&rarr;</span></p>
                    </>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                    <img
                      alt=""
                      src="https://tailwindui.com/plus-assets/img/flags/flag-united-kingdom.svg"
                      className="block h-auto w-5 shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium">UK</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div onClick={() => setIsSearchOpen(true)} className="flex lg:ml-6">
                  <a href="#" className="p-2 text-gray-400 hover:text-gray-500 z-60">
                    <span className="sr-only">Search</span>
                    <MagnifyingGlassIcon aria-hidden="true" className="size-6 z-60" />
                  </a>
                </div>

                {isSearchOpen && (
  <div 
    className="fixed inset-0 backdrop-blur-xl flex justify-center items-start pt-10 z-120 transition-all"
    onClick={() => setIsSearchOpen(false)} // Click outside to close
  >
    {/* Search box */}
    <div 
      className="relative bg-white p-6 rounded-lg shadow-lg w-3/4 sm:w-1/2 lg:w-1/3"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      {/* Input Field */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search for products..."
        autoFocus
      />

      {/* Show products results */}
      <div className="mt-4 max-h-60 overflow-y-auto">
        {products.length > 0 ? (
          products
          .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((product) => (
            <a 
              key={product.id} 
              href={`/products/${product.id}`} 
              className="block p-3 border-b border-gray-200 hover:bg-gray-100"
            >
              <div className="flex items-center">
                {/* Product Image */}
                <img className="w-16 h-16 object-cover rounded-md" src={product.image} alt={product.name} />

                {/* Product Details */}
                <div className="ml-3">
                  <p className="text-lg font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-600">£{product.price}</p>
                </div>
              </div>
            </a>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-2">No products found.</p>
        )}
      </div>
    </div>
  </div>
)}
        
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 z-60">
                  <a href="#" className="group -m-2 flex items-center p-2" onClick={() => handleOpenCart()}>
                    <ShoppingBagIcon
                      aria-hidden="true"
                      className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartNumber}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
    
    </>
  )
}

export default Navbar