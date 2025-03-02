import { useState, useEffect, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";



const AdminUpdateOrderSelect = ({ label, options, selected, setSelected }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <h3 className="text-lg font-medium mb-2">{label}</h3>
            <div 
                className="w-full p-3 border border-gray-300 rounded-md bg-white cursor-pointer flex justify-between items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>{options.find((opt) => opt.value === selected)?.label || "Select an option"}</span>
                <IoChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>

            {isOpen && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md">
                    {options.map((option) => (
                        <div 
                            key={option.value} 
                            className="p-3 flex items-center gap-3 hover:bg-gray-100 cursor-pointer transition"
                            onClick={() => {
                                setSelected(option.value);
                                setIsOpen(false);
                            }}
                        >
                            {option.icon}
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminUpdateOrderSelect