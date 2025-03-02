import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel } from "react-icons/tb";
import { TbLego } from "react-icons/tb";




const AdminInventory = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios.get("http://localhost:3000/products");
    setProducts(response.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Calculating stats
  const totalStock = products.reduce((acc, product) => acc + product.stock, 0);
  const totalProducts = products.length;
  const itemsLast7Days = products.filter(product => {
    const addedDate = new Date(product.addedAt);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return addedDate >= sevenDaysAgo;
  }).length;
  const outOfStock = products.filter(product => product.stock === 0).length;

  return (
    <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <AiOutlineProduct className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Stock</h3>
            <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <CiCalendarDate className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Recent Products</h3>
            <p className="text-2xl font-bold text-gray-900">{itemsLast7Days}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <TbShoppingCartCancel className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Out of Stock</h3>
            <p className="text-2xl font-bold text-gray-900">{outOfStock}</p>
        </div>
        </div>

        <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
        <div className="p-3 rounded-md bg-[#e9ebee]">
            <TbLego className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-sm font-semibold text-gray-600">Total Products</h3>
            <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
        </div>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="flex justify-between items-middle">
        <h2 className="text-2xl font-semibold mb-4">Product Inventory</h2>
        <button className="px-4 py-2 rounded-md border mb-4 border-[#e9ebee]">Filter</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Product</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Category</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Price</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Stock</th>
              <th className="px-6 py-3 border-b border-[#e9ebee]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 border-b border-[#e9ebee] flex items-center gap-3">
                    <img className="w-10 h-10 object-cover rounded" src={product.image} alt={product.name} />
                    <span className="text-gray-700 font-medium">{product.name}</span>
                  </td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">{product.category || "N/A"}</td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">£{product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">{product.stock}</td>
                  <td className="px-6 py-4 border-b border-[#e9ebee]">
                    <span className="text-indigo-600 cursor-pointer hover:text-indigo-700">Edit</span>
                    <span className="ml-3 text-red-600 cursor-pointer hover:text-red-700">Delete</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-6 py-4 border-b border-[#e9ebee]">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInventory;