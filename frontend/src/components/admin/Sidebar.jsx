import { useState } from "react";
import { Menu, X, Home, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminDashboard from "./AdminDashboard";
import AdminInventory from "./AdminInventory";
import AdminCalendar from "./AdminCalendar";
import SidebarItem from "./SidebarItem";
import AdminOrders from "./AdminOrders";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [section, setSection] = useState('Dashboard')

  const renderSection = (section) => {
    switch (section) {
        case 'Dashboard':
        return <AdminDashboard />
        case 'Inventory':
        return <AdminInventory />
        case 'Calendar':
        return <AdminCalendar />
        case 'Orders':
        return <AdminOrders />
    }
  }

  const navMenu = [
    { id: 1, section: 'Dashboard', icon: <Home /> },
    { id: 2, section: 'Inventory', icon: <User /> },
    { id: 3, section: 'Calendar', icon: <User /> },
    { id: 4, section: 'Orders', icon: <User /> },
    { id: 5, section: 'Users', icon: <User /> }
  ]


  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#e9ebee] p-5 transform ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } transition-transform md:translate-x-0 md:w-64`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Sidebar</h2>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
        <nav className="flex flex-col gap-4">
            {navMenu.map((nav, i) => (
                <SidebarItem
                key={i}
                icon={nav.icon}
                section={nav.section}
                setSection={setSection} // Pass function, not a string
                currentSection={section} // Pass current section state
                />
            ))}
            </nav>

      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 md:ml-64 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white p-4 flex items-center justify-between border-b border-[#e9ebee] z-50 md:ml-64">
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="md:hidden" onClick={() => setIsOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
            <img src="/logo.png" alt="Logo" className="w-10 h-10" />
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">
              <User className="w-6 h-6" />
            </Button>
            <Button variant="ghost">
              <Settings className="w-6 h-6" />
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#f9fafb] mt-16">
            <div className="flex justify-between align-middle">
            <p className="text-xl font-bold">{section}</p>
            <p className="text-gray-500">Home<span className="ml-2 mr-2">/</span>{section}</p>
            </div>
            <div className="mt-4">
          {renderSection(section)}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
