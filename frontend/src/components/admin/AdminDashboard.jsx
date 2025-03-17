import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel } from "react-icons/tb";
import { TbLego } from "react-icons/tb";
import { PaperClipIcon } from '@heroicons/react/20/solid'
import { PDFDownloadLink } from "@react-pdf/renderer";
import AdminLowStockReport from "./reports/AdminLowStockReport";


const AdminDashboard = () => {

    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [buyValue, setBuyValue] = useState(4.99)
    const [lowStock, setLowStock] = useState([])

    const fetchData = async () => {
        try {
            const [orderRes, productRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/orders`),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`),
            ]);

            const lowStockProducts = productRes.data.filter(product => product.stock <= 2)
            setLowStock(lowStockProducts)

            setOrders(orderRes.data)
            setProducts(productRes.data)
    
        } catch (e) {
            console.error('Error fetching data:', e);
        }
    };

    useEffect(() => {
        fetchData()
    }, [])

    const numberOfProducts = products.length
    const ordersValue = orders?.reduce(
        (sum, order) => sum + order.products?.reduce(
            (orderSum, item) => orderSum + (item.quantity * item.price), 0
        ) || 0, 
        0
    ).toFixed(2);
    const inventoryStock = products.reduce((sum, item) => sum + item.stock * item.price, 0).toFixed(2)

    const getStatusCounts = (orders) => {
        return orders.reduce((acc, order) => {
          const status = order.status || "Pending"; // Default to "Pending" if status is missing
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});
      };
      
      const statusCounts = getStatusCounts(orders);

      const findPopularProducts = (orders) => {
        const productCounts = {};
      
        orders.forEach(order => {
          order.products.forEach(product => {
            if (productCounts[product.name]) {
              productCounts[product.name].quantity += product.quantity;
            } else {
              productCounts[product.name] = {
                name: product.name,
                image: product.image,
                quantity: product.quantity
              };
            }
          });
        });
      
        // Convert object to array and sort by quantity (highest first)
        return Object.values(productCounts).sort((a, b) => b.quantity - a.quantity);
      };
      
      // Example usage
      const popularProducts = findPopularProducts(orders);
      console.log(popularProducts);

      const totalValue = products.reduce((acc, product) => acc + product.bought * product.stock, 0);
        const totalQuantity = products.reduce((acc, product) => acc + product.stock, 0);
        const averageBought = totalValue / totalQuantity;
        const otherCosts = 0.20; // Any other costs
        const ebayFee = 0.15 * buyValue; // 15% eBay fee
        const shippingCost = 1.10


        const etsyListingFee = 0.20; // Listing fee
        const etsyTransactionFee = 0.05 * (buyValue + shippingCost); 

        // Calculate total costs for Etsy
        const totalEtsyCosts = (averageBought + otherCosts + etsyListingFee + etsyTransactionFee).toFixed(2);



        // Function to calculate profit
        const calculateProfit = (sellingPrice) => {
            return (sellingPrice - (averageBought + otherCosts)).toFixed(2);
        };

        const calculateEbayMargin = (sellingPrice) => {
            const ebayFee = 0.15 * sellingPrice; // 15% eBay fee
            const totalCosts = averageBought + otherCosts + ebayFee; // Total costs including eBay fee
            return (sellingPrice - totalCosts).toFixed(2); // Margin after subtracting total costs
          };

          const ebayCosts = (averageBought + otherCosts + ebayFee).toFixed(2); // Total costs including eBay fee

          const calculateEtsyMargin = (sellingPrice) => {
            const etsyFee = 0.065 * (sellingPrice + shippingCost); // 6.5% fee on (selling price + shipping)
            const listingFee = 0.20; // Fixed listing fee
            const totalCosts = averageBought + otherCosts + etsyFee + listingFee;
            return (sellingPrice - totalCosts).toFixed(2); // Margin after subtracting costs
        };
        

      


          
            
      
    

    return (

        <>
            <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <AiOutlineProduct className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Stock Revenue</h3>
            <p className="text-2xl font-bold text-gray-900">£{inventoryStock}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <CiCalendarDate className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <TbShoppingCartCancel className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Sales (£)</h3>
            <p className="text-2xl font-bold text-gray-900">£{ordersValue}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <TbLego className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Products</h3>
            <p className="text-2xl font-bold text-gray-900">{numberOfProducts}</p>
        </div>
        </div>
      </div>

      <div class="grid grid-cols-2 grid-rows-2 gap-4">
  <div class="p-4 border border-[#e9ebee]">
    <p className="py-2 font-bold">Shipping Status</p>
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
    <tr className="bg-gray-100 text-gray-700">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Status
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
            {Object.entries(statusCounts).map(([status, count]) => (
        <tr key={status} className="hover:bg-gray-50 transition">
        <td className="px-6 py-2 border-b border-[#e9ebee]">{status}</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{count} <span className="text-xs">({((count / orders.length) * 100).toFixed(2) }%)</span></td>
      </tr>
    ))}
            </tbody>
          </table>
  </div>


  <div className="p-4 border border-[#e9ebee]">
  <p className="py-2 font-bold">Popular Products</p>
  {/* Wrap table in a div for scroll functionality */}
  <div className="overflow-x-auto max-h-[200px] overflow-y-auto">
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold sticky top-0 z-10">
    <tr>
          <th className="border border-gray-300 px-4 py-2">Product</th>
          <th className="border border-gray-300 px-4 py-2">Quantity Sold</th>
        </tr>
      </thead>
      <tbody>
        {popularProducts.map((product, index) => (
          <tr key={index} className="hover:bg-gray-50 transition">
            <td className="px-6 py-2 border-b border-[#e9ebee] flex items-center space-x-3">
              <img src={product.image} alt={product.name} className="w-10 h-10 rounded" />
              <span>{product.name}</span>
            </td>
            <td className="px-6 py-2 border-b border-[#e9ebee]">{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>





<div className="p-4 border border-[#e9ebee]">
      <p className="text-sm font-bold">Quick Actions</p>
      <p className="text-xs mt-1 text-gray-400 mb-2">Perform quick actions</p>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Low Stock Report</p>
        <PDFDownloadLink document={<AdminLowStockReport lowStockItems={lowStock} />} fileName="lowstock.pdf">
                      <button className="text-xs transition text-indigo-500 hover:text-indigo-700 cursor-pointer flex items-center">Download
                      <PaperClipIcon className="w-3 h-3 text-gray-600 ml-2" />
                      </button>
          </PDFDownloadLink>
      </div>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Sales Report</p>
        <div className="flex items-center cursor-pointer">
          <p className="mr-2 text-indigo-500 hover:text-indigo-600 text-xs">Download</p>
          <PaperClipIcon className="w-3 h-3 text-gray-600" />
        </div>
      </div>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Users Report</p>
        <div className="flex items-center cursor-pointer">
          <p className="mr-2 text-indigo-500 hover:text-indigo-600 text-xs">Download</p>
          <PaperClipIcon className="w-3 h-3 text-gray-600" />
        </div>
      </div>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Month Order Report</p>
        <div className="flex items-center cursor-pointer">
          <p className="mr-2 text-indigo-500 hover:text-indigo-600 text-xs">Download</p>
          <PaperClipIcon className="w-3 h-3 text-gray-600" />
        </div>
      </div>

      <div className="border-t border-[#e9ebee] flex justify-between items-center p-2">
        <p className="text-xs">Low Stock Report</p>
        <div className="flex items-center cursor-pointer">
          <p className="mr-2 text-indigo-500 hover:text-indigo-600 text-xs">Download</p>
          <PaperClipIcon className="w-3 h-3 text-gray-600" />
        </div>
      </div>
    </div>



  <div className="p-4 border border-[#e9ebee]">
  <div className="flex justify-between items-center">
  <p className="py-2 font-bold">Margins</p>
  <p className="text-xs font-bold border border-[#e9ebee] p-2 text-indigo-500">Avg Margin: £{averageBought}</p>
  </div>
  {/* Wrap table in a div for scroll functionality */}
  <div className="overflow-x-auto max-h-[200px] overflow-y-auto">
    <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
    <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold sticky top-0 z-10">
    <tr>
          <th className="border border-gray-300 px-4 py-2">Platform</th>
          <th className="border border-gray-300 px-4 py-2">Sale Price</th>
          <th className="border border-gray-300 px-4 py-2">Costs</th>
          <th className="border border-gray-300 px-4 py-2">Profit</th>
          <th className="border border-gray-300 px-4 py-2">Margin</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        <td className="px-6 py-2 border-b border-[#e9ebee]">Website</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]"><input className="w-16" value={buyValue} onChange={(e) => setBuyValue(e.target.value)} type="number" placeholder="£4.99" /></td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{otherCosts}</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{calculateProfit(buyValue)}</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{(calculateProfit(buyValue) / buyValue * 100).toFixed(2)}%</td>

        </tr>
        <tr>
        <td className="px-6 py-2 border-b border-[#e9ebee]">eBay</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]"><input className="w-16" value={buyValue} onChange={(e) => setBuyValue(e.target.value)} type="number" placeholder="£4.99" /></td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{ebayCosts}</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{calculateEbayMargin(buyValue)}</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{(calculateEbayMargin(buyValue) / buyValue * 100).toFixed(2)}%</td>
        </tr>
        <tr>
        <td className="px-6 py-2 border-b border-[#e9ebee]">Etsy</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]"><input className="w-16" value={buyValue} onChange={(e) => setBuyValue(e.target.value)} type="number" placeholder="£4.99" /></td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{totalEtsyCosts}</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{calculateEtsyMargin(buyValue)}</td>
        <td className="px-6 py-2 border-b border-[#e9ebee]">{(calculateEtsyMargin(buyValue) / buyValue * 100).toFixed(2)}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
  </div>



      </div>
        </>
    )
}

export default AdminDashboard