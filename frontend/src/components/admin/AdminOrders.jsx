import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel, TbLego } from "react-icons/tb";
import AdminUpdateOrderSelect from "./AdminUpdateOrderSelect";
import { TbTruckDelivery, TbCircleCheck, TbCircleX } from "react-icons/tb";
import { MdPendingActions, MdLocalShipping } from "react-icons/md";
import { FaRegFilePdf } from "react-icons/fa6";
import { GrPrint } from "react-icons/gr";
import { toast } from 'sonner'


const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [updatedOrder, setUpdatedOrder] = useState(null);

    const fetchOrders = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`);

            setOrders(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [selectedOrder, updatedOrder]);

    const showPay = (order) => {
        if (order.paid) {
            return (
                <span className="text-green-700 bg-green-200 p-1 rounded-md font-bold text-xs">PAID</span>
            )
        } else {
            return (
                <span className="text-red-700 bg-red-200 p-1 rounded-md font-bold text-xs">NOT PAID</span>
            )
    }
}

    const showStaus = (status) => {
        switch (status) {
            case "pending":
                return (
                    <span className="text-gray-700 bg-gray-200 p-1 rounded-md font-bold text-xs">Pending</span>
                );
            case "processing":
                return (
                    <span className="text-blue-700 bg-blue-200 p-1 rounded-md font-bold text-xs">Processing</span>
                );
            case "shipped":
                return (
                    <span className="text-orange-700 bg-orange-200 p-1 rounded-md font-bold text-xs">Shipped</span>
                );
                case "delivered":
                return (
                    <span className="text-green-700 bg-green-200 p-1 rounded-md font-bold text-xs">Delivered</span>
                );
            case "cancelled":
                return (
                    <span className="text-red-700 bg-red-200 p-1 rounded-md font-bold text-xs">Cancelled</span>
                );
        }
    }

    const calculateTotal = (products) => {
        return products.reduce((sum, pro) => sum + pro.price * pro.quantity, 0);
    }

    const ordersValue = orders?.reduce(
        (sum, order) => sum + order.products?.reduce(
            (orderSum, item) => orderSum + (item.quantity * item.price), 0
        ) || 0, 
        0
    ).toFixed(2);
    
    const avgOrder = ordersValue / orders.length


    const editOneOrder = async (id) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/orders/${id}`,  { order: updatedOrder } )
            toast.success('Order successfully updated!')
        }catch(e){
            console.log(e)
        }
    }

    return (
        <>
            <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">
            {selectedOrder ? (
                <>
                <div className="flex justify-between items-middle">
                <span className="text-indigo-600 font-bold text-2xl">£{(calculateTotal(selectedOrder.products) + Number(selectedOrder.shipping_fee))}</span>
                <div className="flex gap-2">
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><GrPrint /></button>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer"><FaRegFilePdf /></button>
                <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee] hover:bg-gray-50 cursor-pointer">Back</button>
                </div>
                </div>
                <div className="p-4 rounded-md border border-gray-200">
                <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                <p><strong>Order ID:</strong> {selectedOrder.id}</p>
                <p><strong>Status:</strong> {showStaus(selectedOrder.status)}</p>
                <p><strong>Order Date:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
                <p><strong>Expected Delivery Date:</strong> {new Date(selectedOrder.delivery_date).toLocaleDateString()}</p>
            </div>

            {/* Customer Information */}
            <div className="p-4 border border-gray-200 rounded-md mt-6">
                <h3 className="text-lg font-medium mb-2">Customer Information</h3>
                <p><strong>Name:</strong> Patrick Bell</p>
                <p><strong>Email:</strong> patrickbell1302@gmail.com</p>
                <p><strong>Phone:</strong> 07710279288</p>
                <p><strong>User:</strong> No</p>
            </div>

            {/* Payment Address */}
            <div className="border border-gray-200 p-4 rounded-md mt-6">
                <h3 className="text-lg font-medium mb-2">Payment</h3>
                <p><strong>Payment Method:</strong> {selectedOrder.payment_method}</p>
                <p><strong>Paid:</strong> {selectedOrder.paid ? "Yes" : "No"}</p>
                <p><strong>Shipping Fee:</strong> £{selectedOrder.shipping_fee}</p>
            </div>

            {/* Shipping Address */}
            <div className="border border-gray-200 p-4 rounded-md mt-6">
                <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                <p>{selectedOrder?.address}</p>
            </div>

            {/* Product List */}
            <div className="border border-gray-200 p-4 rounded-md mt-6">
                <h3 className="text-l font-medium mb-2">Products</h3>
                {selectedOrder?.products.map((product, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-gray-200 py-2">
                        <div className="flex items-center gap-4">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                                <p className="font-semibold">{product.name}</p>
                                <p>Price: £{product.price.toFixed(2)}</p>
                                <p>Quantity: {product.quantity}</p>
                                <p>
                                    Reviewed: 
                                    <span className={product.reviewed ? "text-green-600" : "text-red-600"}>
                                        {product.reviewed ? " Yes" : " No"}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <p className="font-medium">£{(product.price * product.quantity).toFixed(2)}</p>
                    </div>
                ))}
                </div>
                  
                </>
            ): updatedOrder ? (
                <>
                <div className="flex justify-between items-center">
                    <h2 className="text-gray-600 font-bold text-2xl">Order #{updatedOrder?.id}</h2>
                    <button 
                        onClick={() => setUpdatedOrder(null)} 
                        className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee]"
                    >
                        Back
                    </button>
                </div>


            
                {/* Update Shipping Status */}
                <div className="p-4 border border-gray-200 rounded-md mt-6">
                    <AdminUpdateOrderSelect
                    label="Update Shipping Status"
                    options={[
                        { value: "pending", label: "Pending", icon: <MdPendingActions className="text-gray-600" /> },
                        { value: "processing", label: "Processing", icon: <TbTruckDelivery className="text-blue-600" /> },
                        { value: "shipped", label: "Shipped", icon: <MdLocalShipping className="text-orange-600" /> },
                        { value: "delivered", label: "Delivered", icon: <TbCircleCheck className="text-green-600" /> },
                        { value: "cancelled", label: "Cancelled", icon: <TbCircleX className="text-red-600" /> }
                    ]}
                    selected={updatedOrder?.status}
                    setSelected={(value) => setUpdatedOrder({ ...updatedOrder, status: value })}
                />
                </div>
            
                {/* Update Payment Status */}
                <div className="p-4 border border-gray-200 rounded-md mt-6">
                <AdminUpdateOrderSelect 
                    label="Update Payment Status"
                    options={[
                        { value: false, label: "Not Paid", icon: <TbCircleX className="text-red-600" /> },
                        { value: true, label: "Paid", icon: <TbCircleCheck className="text-green-600" /> }
                    ]}
                    selected={updatedOrder?.paid ? true : false}
                    setSelected={(value) => setUpdatedOrder({ ...updatedOrder, paid: value === true })}
                />
            </div>
            
                {/* Confirm Button */}
                <button 
                    onClick={() => editOneOrder(updatedOrder?.id)} 
                    className="mt-6 w-full bg-indigo-600 text-white font-medium p-3 rounded-md hover:bg-indigo-700 transition hover:cursor-pointer"
                >
                    Confirm Changes
                </button>
            </>
            
            ):(
                <>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <AiOutlineProduct className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Total Orders</h3>
                        <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <CiCalendarDate className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Average Order</h3>
                        <p className="text-2xl font-bold text-gray-900">£{(avgOrder).toFixed(2)}</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbShoppingCartCancel className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Completed Orders</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbLego className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Refunded Orders</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-middle">
                <h2 className="text-2xl font-semibold mb-4">Orders</h2>
                <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee]">Filter</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
                        <tr>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Order Id</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Date</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">No. of items</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Price</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Paid</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Status</th>
                            <th className="px-6 py-3 border-b border-[#e9ebee]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{order?.id}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{new Date(order?.date).toLocaleString('en-GB')}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    {order?.products.reduce((sum, pro) => sum + pro.quantity, 0)}
                                </td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">£{order?.total_price}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{showPay(order)}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">{showStaus(order?.status)}</td>
                                <td className="px-6 py-4 border-b border-[#e9ebee]">
                                    <span onClick={() => setSelectedOrder(order)} className="text-indigo-600 cursor-pointer hover:text-indigo-700">
                                        View
                                    </span>
                                    <span onClick={() => setUpdatedOrder(order)} className="ml-3 text-indigo-600 cursor-pointer hover:text-indigo-700">
                                        Update
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </>
            )}
        </div>
        </>
    );
};

export default AdminOrders;
