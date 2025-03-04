import { useEffect, useState } from "react";
import axios from "axios";
import { AiOutlineProduct } from "react-icons/ai";
import { CiCalendarDate } from "react-icons/ci";
import { TbShoppingCartCancel, TbLego } from "react-icons/tb";
import { GrPrint, GrUpdate } from "react-icons/gr";
import { FaRegFilePdf } from "react-icons/fa6";


const AdminUsers = () => {

    return (

        <>
        <div className="p-6 bg-white rounded-lg border border-[#e9ebee]">

         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <AiOutlineProduct className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Total Users</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <CiCalendarDate className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Recent Users</h3>
                        <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbShoppingCartCancel className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Google Users</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
                    </div>
                </div>

                <div className="p-4 rounded-lg border border-[#e9ebee] flex items-center gap-4 bg-white">
                    <div className="p-3 rounded-md bg-[#e9ebee]">
                        <TbLego className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-600">Pending Reviews</h3>
                        <p className="text-2xl font-bold text-gray-900"></p>
                    </div>
                </div>
            </div>

            </div>

        
        </>
    )
}

export default AdminUsers