import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { getProducts } from '../routes/ProductRoutes'
import ProductCard from '../product_page/ProductCard'

const RelatedProductsModal = ({ open, setOpen, product }) => {

    const [relatedProducts, setRelatedProducts] = useState([])

    const findRelatedProducts = async () => {
        try{
            const response = await getProducts()
            const products = response.filter(item => item.category === product?.category && item.id !== product.id)
            setRelatedProducts(products)

        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        findRelatedProducts()
    }, [product])


    return (
        
        <>
    <Dialog open={open} onClose={setOpen} className="relative z-60">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                      Related Products
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Below are the related products to  <strong>LEGO custom {product?.name} minifigure</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Products Grid */}
              <div className="bg-gray-50 px-4 py-3 sm:px-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {relatedProducts?.map((relatedProduct) => (
                   <ProductCard product={relatedProduct} />
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Close
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
        </>
    )
}

export default RelatedProductsModal