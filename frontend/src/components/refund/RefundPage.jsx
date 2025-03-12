import Footer from "../front_page/Footer"
import Navbar from "../front_page/Navbar"

const Refund = () => {

    return (

        <>
        <Navbar />
        
        <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-3xl mx-auto px-4">
            <p className="text-center font-bold text-2xl">Refund Policy</p>
            <div className="border-b border-gray-200 py-3">
            <p className="font-bold">Returns</p>
            <p className="mt-2">We have a 30 day return policy which means any return requests <strong>MUST</strong> be made within 30 days of purchase.</p>
            <p className="mt-2">To be eligible for a full refund, you must ensure the product is in the same condition and package as you bought it.</p>
            </div>

            <div className="border-b border-gray-200 py-3">
            <p className="font-bold">Eligible Refunds</p>
            <p className="mt-2">To start a refund, please contact us at refunds@minifigures.com and we will send you a return address to send your items back. Items that are sent
                back to us without initial contact will <strong>NOT</strong> be accepted.
            </p>
            <p className="mt-2">The customer is also responsible for return fees when sending back products <strong>UNLESS</strong> the product is faulty.</p>
            </div>

            <div className="border-b border-gray-200 py-3">
            <p className="font-bold">Refunds</p>
            <p className="mt-2">We have a 30 day return policy which means any return requests must be made within 30 days of purchase.</p>
            <p className="mt-2">To be eligible for a full refund, you must ensure the product is in the same condition and package as you bought it.</p>
            </div>

            <div className="border-b border-gray-200 py-3">
            <p className="font-bold">Illegible Returns</p>
            <p className="mt-2">We have a 30 day return policy which means any return requests must be made within 30 days of purchase.</p>
            <p className="mt-2">To be eligible for a full refund, you must ensure the product is in the same condition and package as you bought it.</p>
            </div>

            <div className="border-b border-gray-200 py-3">
            <p className="font-bold">Shipping</p>
            <p className="mt-2">We have a 30 day return policy which means any return requests must be made within 30 days of purchase.</p>
            <p className="mt-2">To be eligible for a full refund, you must ensure the product is in the same condition and package as you bought it.</p>
            </div>

        </div>
        </div>

        <Footer />
        
        </>
    )
}

export default Refund