import React, { useEffect, useState } from 'react';
import axios from 'axios'
import OrderCard from './OrderCard';
import OrderDetail from './OrderDetail';

const UserOrders = () => {

    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const getOrders = async () => {
        try{
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/my-orders`, { withCredentials: true })
            setOrders(response.data)
            console.log('my orders', response.data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])
 

 
  return (
    <>
     
     {selectedOrder ? (
            <>
            <OrderDetail order={selectedOrder} setSelectedOrder={setSelectedOrder} />
            </>
     ):(
        <>
        <div className="">
        {/* Order Tabs */}
        <div className="bg-white rounded-md mb-4 border border-gray-200">
          <div className="flex">
            <div className="px-4 py-3 text-sm font-medium text-indigo-500 border-b-2 border-indigo-500">
              All Orders
            </div>
            <div className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-indigo-500">
              To Pay
            </div>
            <div className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-indigo-500">
              Awaiting Shipment
            </div>
            <div className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-indigo-500">
              Shipped
            </div>
            <div className="px-4 py-3 text-sm font-medium text-gray-500 hover:text-indigo-500">
              Completed
            </div>
          </div>
        </div>
        </div>


        {orders?.map((order, i) => (
            <OrderCard key={i} order={order} setSelectedOrder={setSelectedOrder} />
        ))}
        </>
     )}
    


    </>
  );
};

export default UserOrders;