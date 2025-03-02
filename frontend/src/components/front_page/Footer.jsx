const Footer = () => {
    return (
      <footer className="bg-indigo-600 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <h2 className="text-xl font-semibold text-white">YourCompany</h2>
              <p className="mt-2 text-sm">
                Providing quality products & services since 2024. We are dedicated
                to customer satisfaction and excellence.
              </p>
            </div>
  
            {/* Navigation Links */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-indigo-400 transition">About Us</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition">Services</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition">Contact</a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-400 transition">FAQs</a>
                </li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <div className="mt-3 flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                  <i className="fab fa-facebook text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                  <i className="fab fa-instagram text-2xl"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-indigo-400 transition">
                  <i className="fab fa-linkedin text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
  
          {/* Divider */}
          <hr className="my-6 border-gray-700" />
  
          {/* Copyright Section */}
          <div className="text-center text-sm">
            <p>© {new Date().getFullYear()} YourCompany. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  